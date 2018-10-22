const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);

// eslint-disable-next-line no-console
console.log('running on http://localhost:3000');
