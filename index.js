const express=require('express')
const app=express()
require('dotenv').config()
var cors = require('cors')
const cookieParser = require("cookie-parser");
const userroutes=require("./routes/userroutes")
const taskroutes=require("./routes/taskroutes")

const connectdb=require('./config/db')
connectdb()

app.use(express.json())
app.use(cookieParser());
const corsOptions = {
  origin: ['https://user-first-program-front-end.vercel.app','http://localhost:5173'], // must be exact frontend URL
  credentials: true, // allow cookies, headers, etc.
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions)) 


app.get('/',(req,res)=>{res.send("Welcome To Task Manager")})

app.use('/',userroutes)
app.use('/',taskroutes)

app.listen(process.env.PORT,()=>{
    console.log(`Listening at port ${process.env.PORT}`)
})