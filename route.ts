import { IncomingMessage, ServerResponse } from "http";
import path from 'path'
import os from 'os'
import fs, { PathLike } from 'fs'
import Busboy from 'busboy'
import FormData from 'form-data'
import axios from 'axios'

function streamToBuffer(stream): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    let buffers: any[] = [];
    stream.on('error', reject);
    stream.on('data', (data) => buffers.push(data))
    stream.on('end', () => resolve(Buffer.concat(buffers)))
  })
}


function bufferToFormData(buffer: Buffer, contentType: string): Promise<FormData> {
  return new Promise((resolve, reject) => {
    const formData: FormData = new FormData()
    var bb = Busboy({ headers: { 'content-type': contentType } });
    bb.on('file', (name, file, info) => {
      let buf: any[] = []
      file.on('data', (data) => {
        buf.push(data)
      }).on('close', () => {
        const saveTo: PathLike = path.join(os.tmpdir(), info.filename);
        fs.writeFileSync(saveTo, Buffer.concat(buf))
        formData.append(name, fs.createReadStream(saveTo))
      });
    });
    bb.on('field', (name, val, info) => {
      formData.append(name, val)
    });
    bb.on('close', () => {
      resolve(formData)
    });
    bb.on('error', reject)
    bb.end(buffer);
  })
}
// Connect.IncomingMessage


const route = (url) => async function(req, res, next) {
  try {

    if (req.originalUrl && (req.originalUrl as string).startsWith('/api')) {
      res.setHeader(
        'Content-Type', "application/json; charset=utf-8"
      )
      // 请求数据类型
      const contentType = req.headers['content-type']
      let accept = req.headers['accept']
      // 请求内容
      let buf = await streamToBuffer(req)

      let config = {}
      // form-data
      if (contentType && contentType.includes('multipart/form-data')) {
        // 解析 form data
        let formData = await bufferToFormData(buf, contentType)

        let headers = formData.getHeaders()
        headers['Authorization'] = req.headers.authorization,
          config = {
            method: 'POST',
            headers: headers,
            data: formData
          }
      } else {

        let data = {}
        let body = buf.toString()
        if (body.length > 0) {
          data = JSON.parse(body)
        }
        config = { data }
      }

      try {

        let result = await axios({
          url: url + req.originalUrl,
          method: req.method,
          headers: {
            Accept: accept,
            Authorization: req.headers.authorization,
            'Content-Type': contentType
          },
          responseType: 'stream',
          ...config
        })
        result.data.pipe(res)
      } catch (err) {
        res.statusCode = err.toJSON().status
        err.response.data.pipe(res)
      }

    } else {
      next()
    }
  } catch (error) {
    res.statusCode = 404
    res.end(JSON.stringify({ "code": 404, "error": "proxy 出错" }))
  }
}


export default route
