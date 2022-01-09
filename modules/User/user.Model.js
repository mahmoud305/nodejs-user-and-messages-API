const {model} = require("mongoose");
const { userSchema } = require("./user.Schema");

const userModel = model("user",userSchema);

module.exports=userModel;