import { Plugin } from 'vite'
import axios from 'axios'
import FormData from 'form-data'
import fs from 'fs'
import Busboy from 'busboy'
import path from 'path'
import os from 'os'

import route from './route'



function streamToBuffer(stream): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    let buffers = [];
    stream.on('error', reject);
    stream.on('data', (data) => buffers.push(data))
    stream.on('end', () => resolve(Buffer.concat(buffers)))
  })
}


function bufferToFormData(buffer: Buffer, contentType: string): Promise<FormData> {
  return new Promise((resolve, reject) => {
    const formData = new FormData()
    var bb = Busboy({ headers: { 'content-type': contentType } });
    bb.on('file', (name, file, info) => {
      let buf = []
      file.on('data', (data) => {
        buf.push(data)
      }).on('close', () => {
        const saveTo = path.join(os.tmpdir(), info.filename);
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

type FnType = (url: string) => Plugin

const proxy: FnType = (url) => ({
  name: 'configure-server',
  configureServer(server) {

    server.middlewares.use(route(url))
  },
})

export default proxy
