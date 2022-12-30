const { MongoClient, ServerApiVersion } = require('mongodb');
const express=require('express');
const cors=require('cors');
const app=express();
require('dotenv').config();
const port=process.env.PORT|| 4000;

// middlware
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mjqzqbo.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
try{
    const postsCollection=client.db('dUser').collection('postCollection');
    const postDetailCollection=client.db('dUser').collection('postDetailCollection');
    app.get('/posts',async(req,res)=>{
        const query={}
        const result=await postsCollection.find(query).toArray();
        res.send(result);
    })
    app.get('/top-post',async(req,res)=>{
        const query={}
        const result=await postDetailCollection.find(query).limit(3).toArray();
        res.send(result);
    })
    app.post('/posts',async(req,res)=>{
        const post=req.body;
        // console.log(post)
        const result=await postsCollection.insertOne(post);
        res.send(result);
    })
    app.post('/postdetails',async(req,res)=>{
        const postdtail=req.body;
        const result=await postDetailCollection.insertOne(postdtail);
        res.send(result)
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
 