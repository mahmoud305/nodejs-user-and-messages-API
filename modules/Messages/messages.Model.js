const {model}  = require("mongoose");
const messageSchema = require("./messages.Schema");

const messageModel= model("message",messageSchema);

module.exports=messageModel