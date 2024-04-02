const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

app.use(express.json())

app.get('/', (req, res) => {
   res.send('Main Game')
})

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://naqiuudin03:naqiu@cluster0.boapn52.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    //insert one
    //  let result = await client.db('testing').collection('subject').insertOne({
    //    subject:'Berg 123',
    //    code:'Berg 123',
    //    credit:2



    //  })
    
    // console.log(result)

   //find
   // let subject = await client.db('testing').collection('subject').find().toArray()
   // console.log(subject)

  //updatedone
    // let updated= await client.db('testing').collection('subject').updateOne(
    //   {code:'Berr 123'},
    //   {
    //   $set:{
    //     description:'Data science',
    //     lecturer:'Dr john',
    //     semester:3
    //   }

    // }
    // )
    // console.log(updated)

    //deleteone
    let deleted=await client.db('testing').collection('subject').deleteOne()
    {
      _id: new ObjectId('660b6db5fc1e24180f921e22')

    }
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
