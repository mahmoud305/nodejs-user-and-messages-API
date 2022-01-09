const userModel = require("./User/User.Model");

//base URL for user Api 
const baseURL= "/Assingment7" ;

function checkUserExist(id){
    return new Promise( async (x)=>{
        try {
            let user = await userModel.findById(id);
            console.log(user);
            if(user){
                x(true);
            }
            else {
                x(false);
            }
        } catch (error) {
            console.log("error in finding user by ID " +id);
        }
    })
}

function failedCase(res , err){
    res.json({message:"failed" ,error : err});
}
function successCase(res , result){
    res.json({message:"success" ,data : result});
}
module.exports= {checkUserExist,failedCase,successCase ,baseURL}