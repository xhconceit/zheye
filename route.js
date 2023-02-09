var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import path from 'path';
import os from 'os';
import fs from 'fs';
import Busboy from 'busboy';
import FormData from 'form-data';
import axios from 'axios';
function streamToBuffer(stream) {
    return new Promise(function (resolve, reject) {
        var buffers = [];
        stream.on('error', reject);
        stream.on('data', function (data) { return buffers.push(data); });
        stream.on('end', function () { return resolve(Buffer.concat(buffers)); });
    });
}
function bufferToFormData(buffer, contentType) {
    return new Promise(function (resolve, reject) {
        var formData = new FormData();
        var bb = Busboy({ headers: { 'content-type': contentType } });
        bb.on('file', function (name, file, info) {
            var buf = [];
            file.on('data', function (data) {
                buf.push(data);
            }).on('close', function () {
                var saveTo = path.join(os.tmpdir(), info.filename);
                fs.writeFileSync(saveTo, Buffer.concat(buf));
                formData.append(name, fs.createReadStream(saveTo));
            });
        });
        bb.on('field', function (name, val, info) {
            formData.append(name, val);
        });
        bb.on('close', function () {
            resolve(formData);
        });
        bb.on('error', reject);
        bb.end(buffer);
    });
}
// Connect.IncomingMessage
var route = function (url) { return function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var contentType, accept, buf, config, formData, headers, data, body, result, err_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 10, , 11]);
                    if (!(req.originalUrl && req.originalUrl.startsWith('/api'))) return [3 /*break*/, 8];
                    res.setHeader('Content-Type', "application/json; charset=utf-8");
                    contentType = req.headers['content-type'];
                    accept = req.headers['accept'];
                    return [4 /*yield*/, streamToBuffer(req)];
                case 1:
                    buf = _a.sent();
                    config = {};
                    if (!(contentType && contentType.includes('multipart/form-data'))) return [3 /*break*/, 3];
                    return [4 /*yield*/, bufferToFormData(buf, contentType)];
                case 2:
                    formData = _a.sent();
                    headers = formData.getHeaders();
                    headers['Authorization'] = req.headers.authorization,
                        config = {
                            method: 'POST',
                            headers: headers,
                            data: formData
                        };
                    return [3 /*break*/, 4];
                case 3:
                    data = {};
                    body = buf.toString();
                    if (body.length > 0) {
                        data = JSON.parse(body);
                    }
                    config = { data: data };
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, axios(__assign({ url: url + req.originalUrl, method: req.method, headers: {
                                Accept: accept,
                                Authorization: req.headers.authorization,
                                'Content-Type': contentType
                            }, responseType: 'stream' }, config))];
                case 5:
                    result = _a.sent();
                    result.data.pipe(res);
                    return [3 /*break*/, 7];
                case 6:
                    err_1 = _a.sent();
                    res.statusCode = err_1.toJSON().status;
                    err_1.response.data.pipe(res);
                    return [3 /*break*/, 7];
                case 7: return [3 /*break*/, 9];
                case 8:
                    next();
                    _a.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    error_1 = _a.sent();
                    res.statusCode = 404;
                    res.end(JSON.stringify({ "code": 404, "error": "proxy 出错" }));
                    return [3 /*break*/, 11];
                case 11: return [2 /*return*/];
            }
        });
    });
}; };
export default route;
