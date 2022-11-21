require('dotenv').config();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')
const db = require('../models');
const Auth = db.auth;



exports.LoginUsers = async (req, res) => {
  const { userName, password } = req.body
  // console.log(user);
  const user = await Auth.findOne({$or: [{ userName: userName }, { email: userName }] })
  if (user.userName) {
    const passUser = await bcryptjs.compare(password, user.password)
    if (passUser) {
      const data = {
        id: user._id
      }
      const token = await jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: '1800s' })
      return res.status(200).json({
        message: 'berhasil',
        token: token,
        // userName: userName,
        // password: password
      })
    }else{
      return res.status(404).json({
        message: 'Username Atau Email Tidak Tersedia Di Database',
        // token: token,
        // // userName: userName,
        // // password: password
      })
    }
  }
}
exports.create = async (req, res) => {
  const { userName, email, password } = req.body
  const hashPass = await bcryptjs.hash(password, 10);
  const auth = new Auth({
    userName: userName ? userName : "Gagal Di Tambahkan",
    email: email ? email : "Gagal Di Tambahkan",
    password: hashPass,
  })
  auth.save(auth).then((result) => {
    res.send(result);
  }).catch((err) => {
    res.status(500).send({
      message: err.message || 'Some Error Daftar'
    })
  })
}
exports.updateUsers = (req, res) => {
  const id = req.params.id

  Post.findByIdAndUpdate(id, req.body).then((result) => {
    if (!result) {
      res.status(404).send({
        message: "Users Not Found"
      })
    }
    res.send({
      message: "Users Was Updated"
    });
  }).catch((err) => {
    res.status(409).send({
      message: err.message || "Some Error While Update Userss"
    })
  })
}

exports.deleteUsers = (req, res) => {
  const id = req.params.id

  Auth.findByIdAndRemove(id).then((result) => {
    if (!result) {
      res.status(404).send({
        message: "User Not Found"
      })
    }
    res.send({
      message: "User Was Delete"
    });
  }).catch((err) => {
    res.status(409).send({
      message: err.message || "Some Error While Delete Users"
    })
  })
}

exports.findAll = (req, res) => {
  Auth.find().then((result) => {
    res.send(result);
  }).catch((err) => {
    res.status(500).send({
      message: err.message || 'Some Error findAll user'
    })
  })
}



