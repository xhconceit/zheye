import express from 'express';
import route from './route.js';
var app = express();
var port = 3000;
app.use('/api', route('http://api.vikingship.xyz'));
app.use(express.static('dist'));
app.listen(port, function () {
    console.log("http://localhost:".concat(3000));
});
