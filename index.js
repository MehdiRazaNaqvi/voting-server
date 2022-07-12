const express = require("express")
var bodyParser = require('body-parser');

const cors = require("cors")



const app = express()
app.use(cors())



app.use(express.json());

app.use(express.urlencoded({ extended: false }))

app.use(bodyParser.json());




const port = process.env.PORT || 4000

app.listen(port, () => {



    const { MongoClient, ServerApiVersion } = require('mongodb');

    const uri = "mongodb+srv://mehdi:mehdimongodb@cluster0.xuahs.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



    app.get("/get", (req, res) => {
        res.send("Running")
    })





    app.get("/getdata", (req, res) => {




        client.connect(err => {

            //   const collection = client.db("database0").collection("col0");


            client.db("database0").collection("voting").find({}).toArray()
                .then((ans) => res.send(ans))
                .catch((err) => console.log(err))



        })


    })




    app.post('/vote', (req, res) => {

        const party = req.body.party
        const nic = req.body.nic



        client.connect(err => {

            client.db("database0").collection("voting").updateOne({ name: party }, { $push: { count: nic } })

                .then((ans) => console.log(ans))
                .catch((err) => console.log(err))




        })




    })






})
