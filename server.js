const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const fs=require('fs')
const multer=require('multer')
const path=require('path')
const storage=multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploads/')
    },
    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
})
const upload=multer({storage:storage});
module.exports=upload;
const app=express();

const db=require('./app/models')
db.sequelize.sync()

var corOptions={
    origin: "http://localhost:3000",
}

app.use(cors(corOptions))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended:true}))

var dir = path.join(__dirname, 'uploads');

app.use(express.static(dir));

app.get("/",(req,res)=>{
    res.json({message: "Node.js postgresql test"})
})

app.get("/list",(req,res)=>{
    fs.readFile('./app/views/list.html',function(error,data){
        if(error){
            console.log(error);
        }
        else{
            res.writeHead(200,{'Content-Type':'text/html'});
            res.end(data);
        }
    })
})

require("./app/routes/board.route.js")(app);

const PORT =process.env.PORT||3000
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})