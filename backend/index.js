const express = require('express')
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb'); 
const bodyparser = require('body-parser')
const cors = require('cors')

const app = express()
const port = 3000

app.use(bodyparser.json())
app.use(cors())

dotenv.config()


const MongoUri = process.env.MONGODB_URI;
const mongoclient = new MongoClient(MongoUri)
mongoclient.connect()

const dbname = process.env.DATABASE_NAME





app.get('/', async (req, res) => {
  const db = mongoclient.db(dbname)
  const collection = db.collection("Passwords")
  const passwords = await collection.find({}).toArray()
  res.json(passwords)
})
app.post('/', async (req, res) => {
    const password = req.body;
  const db = mongoclient.db(dbname)
  const collection = db.collection("Passwords")
  const passwords = await collection.insertOne(password)
  res.send({success : true , message : "password saved" , result: passwords})
})
app.delete('/', async (req, res) => {
    const password = req.body;
  const db = mongoclient.db(dbname)
  const collection = db.collection("Passwords")
  const passwords = await collection.deleteOne(password)
  res.send({success : true , message : "password saved" , result : passwords})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
