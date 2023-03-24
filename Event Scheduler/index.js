const express=require('express');
const app=express();
const schema = require('./model.js');
const mongoose=require('mongoose');
const cors=require('cors');
const port =process.env.port || 5000

app.use(express.json())
app.use(cors({
    origin: '*'
}))
mongoose.connect('mongodb+srv://Ajay:Ajay@cluster0.quxdouf.mongodb.net/?retryWrites=true&w=majority')
app.post('/V1/events',async(req,res)=>{
    try{
        const title=req.body.title;
        const description=req.body.description;
        const location=req.body.location;
        const newSchema=new schema({
            title:title,
            description:description,
            location:location
        })
         const result=await newSchema.save();
        res.json(result);

    }
    catch(e){
        res.status(400).json({error:"validation error"})
    }
})
 app.get('/v1/events',async(req,res)=>{
     try{
         return res.json(await schema.find())
     }
     catch(e){
         console.log(e);
     }
 })
 app.get('/v1/events/:id',async(req,res)=>{
    try{
        const data= await schema.findById(req.params.id);
        res.json(data);
    }
    catch(e){
        res.status(404).json({error: "no event found"});
    }
 })
 app.put('/v1/events/:id',async(req,res)=>{
    try{
        const id=req.params.id;
        const data=req.body;
        const options={new:true}
        const result=await schema.findByIdAndUpdate(id,data,options);
        res.json(result)
    }
    catch (err) {
        res.status(400).json({error:"validation error"});
    }
    
 })
 app.delete('/v1/delete/:id',async(req,res)=>{
     try{
         await taskSchema.findByIdAndDelete(req.params.id);
         return res.json(await schema.find())
        
     }
     catch(e){
         console.log(e);
     }
})
app.listen(port,()=>{
    console.log('listening on port 5000');
})