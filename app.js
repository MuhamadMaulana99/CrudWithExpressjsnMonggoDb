const express = require('express');
const cors = require('cors');
const db = require('./app/models/');
const app = express();


const corsOptions = {
  methods: 'GET',
	origin: ['http://localhost:3000', 'http://localhost:4000',],
	optionsSuccessStatus: 200 
};

// app.use((_, res, next) => {
//   res.set('Access-Control-Allow-Origin', '*');
//   res.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
//   res.set(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   return next();
// }); 

app.use(cors(corsOptions));
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