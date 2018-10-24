const Router = require('koa-router');
const { query } = require('./db');

const router = Router({
  prefix: '/api/todos'
});

router.get('/', async (ctx, next) => {
  if (!ctx.state.user) {
    ctx.status = 401;
    ctx.body = 'GET /api/todos -> User is not defined';
    return next();
  }

  const userId = ctx.state.user.id;

  const todos = await query(`SELECT id, description, checked FROM todos WHERE user_id=${userId}`);

  ctx.body = todos.map(todo => ({
    ...todo,
    checked: !!todo.checked
  }));
});

router.post('/', async (ctx) => {
  const body = ctx.request.body;
  const userId = ctx.state.user.id;

  try {
    await query(`INSERT INTO todos (description, checked, user_id) 
      VALUES ("${body.description}", "${body.checked ? 1 : 0}", "${userId}")`);

    ctx.body = (await query(`SELECT id, description, checked FROM todos WHERE user_id=${userId} ORDER BY id DESC LIMIT 1`))[0];
  } catch (err) {
    ctx.status = 400;
    ctx.body = err.toString();
  }
});

router.put('/:id', async (ctx) => {
  const body = ctx.request.body;
  const userId = ctx.state.user.id;

  try {
    await query(`UPDATE todos SET 
      description="${body.description}", 
      checked="${body.checked ? 1 : 0}"
      WHERE id=${body.id} and user_id=${userId}`);

    ctx.body = '';
  } catch (err) {
    ctx.status = 400;
    ctx.body = err.toString();
  }
});

router.delete('/:id', async (ctx) => {
  const id = ctx.params.id;
  const userId = ctx.state.user.id;

  try {
    ctx.body = await query(`DELETE FROM todos WHERE id=${id} and user_id=${userId}`);
  } catch (err) {
    ctx.status = 400;
    ctx.body = err.toString();
  }
});

module.exports = router;
