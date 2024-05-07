const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

// app.get('/',(req,res)=>{
//    res.send('Hello World');
// });

   app.get('/user/:id',async(req,res)=>{
  
   let auth = req.headers.authorization
  console.log(auth)

   let authSplitted = auth.split(' ')
   console.log(authSplitted)
 
   let token = authSplitted[1]
   console.log(token)
   let decoded = jwt.verify(token, 'lemah');
   console.log(decoded)

   if(decoded._id != req.params.id){
    res.status(401).send('Unauthorized Access')
   }else{
    let result= await client.db("testing").collection("item").findOne({
      _id: new ObjectId(req.params.id)
    })

    
  
   res.send(result)
  
  
  }
  })



app.use(express.json())
// new user registration
app.post('/user',async(req,res)=>{
//check if username already exist
let existing = await client.db("testing").collection("user").findOne({
  username: req.body.username
})
if(existing){
res.status(400).send('username already exist')
}else{


//insertOne the registration to mongo
const hash = bcrypt.hashSync(req.body.password,10);
   let result = await client.db("testing").collection("user").insertOne(
  {
     username:  req.body.username,
     password: hash,
     name: req.body.name,
     email: req.body.email,

  }
)
res.send(result)
}
})
// user login api
app.post('/login',async(req,res)=>{
   //step #1:
   
let result = await client.db("testing").collection("user").findOne(
    {
      username:req.body.username

    }
  )
   
  
  if(result){
     //step #2:if user exist, check password 
     console.log(req.body.password)
     console.log(result.password)

    if( bcrypt.compareSync(req.body.password, result.password)== true){// check if pass same with hash
      //password is correct
      var token = jwt.sign({ _id: result._id ,username: result.username , name:result.name}, 
        'lemah')
      ;
      res.send(token)
    }else{
      //password is wrong
      res.send('wrong password')
    }


} else{
    //step3: if user not found
    res.send("Username is not found")

    }



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
   
    function verifyToken(req,res,next){
        const authHeader = req.headers.authorization
        const token = authHeader && authHeader.split(' ')[1]

        if (token == null)return res.sendStatus(401)

        jwt.verify(token, "lemah",(err,decoded)=>{
          console.log(err)

          if(err)return res.sendStatus(403)
            req.identify=decoded
          next()
        })

    }
   
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
    //let deleted=await client.db('testing').collection('subject').deleteOne()
    //{
      //_id: new ObjectId('660b6db5fc1e24180f921e22')

    //}
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);