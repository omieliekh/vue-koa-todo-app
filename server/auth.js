const { sign, verify } = require('jsonwebtoken');
const Router = require('koa-router');
const crypto = require('crypto');
const { query } = require('./db');

const SUPER_SECRET = 'change-this';

const router = Router({
  prefix: ''
});

async function getUserDetails(email, hashPassword) {
  const user = (await query(`SELECT id, name, email, passw FROM users where email="${email}"`))[0];

  if (!user) {
    throw new Error('Error: User not found');
  }

  if (user.passw !== hashPassword) {
    throw new Error('Error: Wrong password');
  }

  delete user.passw;

  return {
    token: sign(user, SUPER_SECRET),
    user: user
  }
}

router
  .get('/api/test', async ctx => {
    ctx.type = 'application/json';

    try {
      ctx.body = {
        qwe: 'test'
      }
    } catch (err) {
      ctx.status = 401;
      ctx.body = err.toString()
    }
  })

  .post('/api/login', async ctx => {
    const body = ctx.request.body;
    ctx.type = 'application/json';

    const email = decodeURIComponent(body.email);
    const hashPassword = crypto.createHash('md5').update(body.password).digest("hex");

    try {
      ctx.body = await getUserDetails(email, hashPassword)
    } catch (err) {
      ctx.status = 401;
      ctx.body = err.toString();
    }
  })

  .post('/api/sign-up', async ctx => {
    const body = ctx.request.body;

    try {
      const hashPassword = crypto.createHash('md5').update(body.password).digest("hex");

      await query(`INSERT INTO users (name, email, passw) 
        VALUES ("${body.name}", "${body.email}", "${hashPassword}");`);

      ctx.body = await getUserDetails(body.email, hashPassword)
    } catch (err) {
      ctx.body = err.toString();
      ctx.status = 400;
    }
  })

  .post('/api/check-auth', async ctx => {
    const token = encodeURIComponent(ctx.request.body.token);
    const user = verify(token, SUPER_SECRET);

    ctx.state.user = user;
    ctx.body = {
      user,
      token: sign(user, SUPER_SECRET),
    };
  })

  // secured routes middleware
  .all(/^\/api\/.+/, async (ctx, next) => {
    try {
      let token = ctx.request.headers['authorization'];

      ctx.state.user = verify(token.replace('Bearer ', ''), SUPER_SECRET);

      return next();
    } catch (err) {
      ctx.body = 'Unknown user';
      ctx.status = 401;

    }
  })
;

module.exports = router;

