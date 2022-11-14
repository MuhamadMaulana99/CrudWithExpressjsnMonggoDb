const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const db = require('./app/models/');


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
// mongoose.set("useFindAndModify", false);
db.mongoose.connect(db.url,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  // useCreateIndex: true,
}).then(()=>{
  console.log("Database Terhubung");
}).catch((err)=>{
  console.log(`Datasabe Tidak Terhubung`,err);
  process.exit();
})

const PORT = 8000;

app.get('/', (req, res)=>{
  res.json({
    message: "welcome maulana"
  })
})

require('./app/routes/post.routes')(app);

app.listen(PORT,() =>{
  console.log(`server is running in localhost:${PORT}`);
});