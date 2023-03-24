const mongoose = require('mongoose');
const schema=mongoose.Schema({
    title:{
        type:String,required:true
    },
    description:{
        type:String,reuired:true
    },
    location:{
        type:String,required:true
    }
})
module.exports=mongoose.model('schema',schema);