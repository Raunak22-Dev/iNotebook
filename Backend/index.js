require('dotenv').config();
const connectToMongo =require('./db')
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3002

connectToMongo()

app.use(cors())

app.use(express.json())

app.use('/api/auth',require('./routes/auth'),(req,res)=>{
  res.send("hello")
})
app.use('/api/notes',require('./routes/notes'))



app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})