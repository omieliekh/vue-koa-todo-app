/* eslint-disable no-console */
const Koa = require('koa');
const bodyParser = require('koa-body');
const app = new Koa();

const encodeDecode = require('./encode-decode');
const auth = require('./auth');

app.use(bodyParser({
  formidable:{
    uploadDir: './uploads'
  },
  multipart: true,
  urlencoded: true
}));

app.use(encodeDecode());
app.use(auth.routes());

app.listen(3000);
console.log('running on http://localhost:3000');
