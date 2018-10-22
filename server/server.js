/* eslint-disable no-console */
const Koa = require('koa');
const app = new Koa();

const encodeDecode = require('./encode-decode');
const auth = require('./auth');

app.use(encodeDecode);
app.use(auth.routes());

app.listen(3000);
console.log('running on http://localhost:3000');
