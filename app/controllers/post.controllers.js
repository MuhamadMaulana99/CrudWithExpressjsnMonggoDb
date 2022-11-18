const db = require('../models');
const Post = db.posts;


exports.findAll = (req,res) =>{
  Post.find().then((resulst)=>{
    res.send(resulst);
  }).catch((err)=>{
    res.status(500).send({
      message: err.message || 'Some Error posts'
    })
  })
}

exports.findOne = (req, res) =>{
  const id = req.params.id;
  Post.findById(id).then((result)=>{
    res.send(result);
  }).catch((err)=>{
    res.status(409).send({
      message: err.message || "Some Error Post by Id"
    })
  })
}

exports.create = (req,res) =>{
  const post = new Post({
    title: req?.body.title ? req?.body.title : "Gagal Di Tambahkan",
    body: req?.body.body ? req?.body.body :  "Gagal Di Tambahkan" ,
    publist: req?.body.publist ? req?.body.publist : false
  })
  post.save(post).then((result)=>{
    res.send(result);
  }).catch((err)=>{
    res.status(409).send({
      message: err.message || "Some Error While Create Posts"
    })
  })
}

exports.update = (req, res) =>{
  const id = req.params.id

  Post.findByIdAndUpdate(id, req.body).then((result)=>{
    if(!result){
      res.status(404).send({
        message: "Post Not Found"
      })
    }
    res.send({
      message: "Post Was Updated"
    });
  }).catch((err)=>{
    res.status(409).send({
      message: err.message || "Some Error While Update Posts"
    })
  })
}

exports.delete = (req, res) =>{
  const id = req.params.id

  Post.findByIdAndRemove(id).then((result)=>{
    if(!result){
      res.status(404).send({
        message: "Post Not Found"
      })
    }
    res.send({
      message: "Post Was Delete"
    });
  }).catch((err)=>{
    res.status(409).send({
      message: err.message || "Some Error While Delete Posts"
    })
  })
}
