module.exports = (app) => {
  const posts = require('../controllers/post.controllers');
  const auth = require('../controllers/auth.controller');
  const router = require('express').Router();
  const routerAuths = require('express').Router();

  const middleware = require('../middleware/middleware')

  router.get('/', posts.findAll);
  router.get('/:id', posts.findOne);
  router.post('/', posts.create);
  router.put('/:id', posts.update);
  router.delete('/:id', posts.delete);

  // login
  routerAuths.post('/daftar', auth.create);
  routerAuths.post('/loginUser', auth.LoginUsers);
  routerAuths.get('/', auth.findAll);
  routerAuths.delete('/:id', auth.deleteUsers);
  routerAuths.put('/:id', auth.updateUsers);

  routerAuths.get('/user', middleware, auth.getSingleUser);
  app.use('/api/post', router);
  app.use('/api/login', routerAuths);
}