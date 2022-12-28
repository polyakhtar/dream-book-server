const { MongoClient, ServerApiVersion } = require('mongodb');
const express=require('express');
const cors=require('cors');
const app=express();
require('dotenv').config();
const port=process.env.PORT||5000;

// middlware
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mjqzqbo.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
try{
    const postCollection=client.db('dUser').collection('postCollection');

    app.post('/posts',async(req,res)=>{
        const post=req.body;
        const reault=await postCollection.insertOne(post);
        res.send(post);
    })
}
finally{

}
}
run().catch(error=>console.error(error))

app.get('/',(req,res)=>{
    res.send('server is running')
})
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})
 