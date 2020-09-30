const express = require('express')
const cors =require('cors')
const bodyParser = require('body-parser')
const app=express()
require('dotenv').config()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))




const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fjsvr.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const productCollection = client.db(`${process.env.DB_NAME}`).collection("products");
  const orderCollection = client.db(`${process.env.DB_NAME}`).collection("orders");
  // perform actions on the collection object
 app.get('/showAllProduct',(req,res)=>{
   productCollection.find({})
   .toArray((err,documents)=>{
     res.send(documents)
   })
 })

 app.post('/cartProducts',(req,res)=>{
  productCollection.find({
    key:{
      $in:req.body
    }
  })
  .toArray((err,documents)=>{
   res.send(documents)
  })
  })

  app.post('/addOrder',(req,res)=>{
    orderCollection.insertOne(req.body)
    
  })
 
})


const PORT = process.env.PORT || 3001
app.listen(PORT,()=>{
    console.log("Server is running with "+PORT+" port")
})
