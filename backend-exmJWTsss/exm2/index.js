const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()
//import router
const authRoute = require('./routes/auth')
const postsRoute = require('./routes/posts')
//conect a base de datos
mongoose.connect(process.env.DB_CONNECT,{ useNewUrlParser: true,useUnifiedTopology: true}, () => {
    console.log('connecto BD')
})

//middleware
app.use(express.json())

//cors para que las demas app puedan consumir nuesta app
app.use(cors())

// app.use((req,res,next)=>{
//     res.header("Access-Control-Allow-Origin","*")
//     res.header("Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization")

//     if(req.method === 'OPTIONS'){
//         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
//         return res.status(200).json({})
//     }

// })



//route 
app.use('/api/user', authRoute)

app.use('/api/posts', postsRoute)



app.listen(3002, () => {
    console.log('runing port 3002')
})