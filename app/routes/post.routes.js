module.exports =(app) =>{
  const posts = require('../controllers/post.controllers');
  const auth = require('../controllers/auth.controller');
  const router = require('express').Router();

  router.get('/',posts.findAll);
  router.get('/:id',posts.findOne);
  router.post('/',posts.create);
  router.put('/:id',posts.update);
  router.delete('/:id', posts.delete);

  // login
  router.post('/daftar', auth.create );
  app.use('/api/post', router);
}