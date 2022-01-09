const mongoose = require("mongoose");
const connectionString = "mongodb://localhost:27017/assigmnet7"

const connectToDatabase= ()=>{
mongoose.connect(connectionString)
.then((result) => { console.log("database connected successfully"); })
.catch((error) => { console.log("database connection failed \n",error); });
}


module.exports= connectToDatabase; 