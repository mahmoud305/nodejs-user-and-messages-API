const { Schema ,Types }= require("mongoose");

const messageSchema=Schema({
    content:{type:String,required:true},
    sendTo:{type: Types.ObjectId , ref:"user"} ,
    sendBy:{ type:Types.ObjectId , ref:"user"}
})

module.exports=messageSchema;