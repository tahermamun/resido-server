const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const ObjectID = require('mongodb').ObjectID
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()


const app = express()
app.use(bodyParser.json())
app.use(cors())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qkst0.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



client.connect(err => {
    const houseCollection = client.db("resido").collection("rent-house-collection");
    const reviewCollection = client.db("resido").collection("reviews");
    console.log(err)

    // Add Rent House Method
    app.post('/addHouse', (req, res) => {
        houseCollection.insertOne(req.body)
            .then(res => {
                res.send(res.insertedCount > 0)
            })
    })

    app.post('/addReview', (req, res) => {
        reviewCollection.insertOne(req.body)
            .then(res => {
                res.send(res.insertedCount > 0)
            })
    })

    // get Rent House Method
    app.get('/rentHouse', (req, res) => {
        houseCollection.find({})
            .toArray((err, document) => {
                res.send(document)
            })
    })


    app.get('/reviews', (req, res) => {
        reviewCollection.find({})
            .toArray((err, document) => {
                res.send(document)
            })
    })







});



const port = process.env.PORT || 8080
app.get('/', (req, res) => {
    res.send('hello Resido Server')
})
app.listen(port)