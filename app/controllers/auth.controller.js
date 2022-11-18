const db = require('../models');
// const Auth = require('../models/users.model')
const Post = db.posts
const Auth = db.auth
const User = require('../models/users.model')


exports.create = (req, res) =>{
  const {userName, email, password} = req.body
  const auth = new Auth ({
    userName: userName ? userName : "Gagal Di Tambahkan",
    email: email ? email : "Gagal Di Tambahkan",
    password: password ? password : "Gagal Di Tambahkan",
  })
  auth.save(auth).then((result)=>{
    res.send(result);
  }).catch((err)=>{
    res.status(500).send({
      message: err.message || 'Some Error Daftar'
    })
  })
}