
const res = require("express/lib/response");
const { checkUserExist, successCase, failedCase } = require("../generalFunctions");
const  userModel  = require("./User.Model");
// function failedCase(res , err){
//     res.json({message:"failed" ,error : err});
// }
// function successCase(res , result){
//     res.json({message:"success" ,data : result});
// }
function checkEmailExist(email){
    return new Promise( async (x)=>{
        try {
            user = await userModel.findOne({email , is_deleted:{$eq:false}});
            console.log(user);
            if(user){
                x(true); // email exist 
            }else { 
                x(false); // email dosenot exist
            }
        } catch (error) {
            console.log("error in finding email:\n", error);
            x(false);
        }
    } )
}

// function checkUserExist(id){
//     return new Promise( async (x)=>{
//         try {
//             let user = await userModel.findById(id);
//             console.log(user);
//             if(user){
//                 x(true);
//             }
//             else {
//                 x(false);
//             }
//         } catch (error) {
//             console.log("error in finding user by ID " +id);
//         }
//     })
// }
async function addUser (req,res){
    let {name,email,password,age}= req.body;
    try {
        let checkEmail = await checkEmailExist(email);
        if(checkEmail) { // if email already exist  
            failedCase( res,"email already registered");
            return ;
        }
        let user = new userModel ({name,email,password,age});
        let {_id}= await user.save();
        successCase( res,_id);
        
    } catch (error) {
        failedCase(res,error);
    }
}

const updateUser = async(req,res)=>{
    let {id}= req.params;
    checkUser= await checkUserExist(id);
    if(!checkUser){// user id doesnot exist 
        failedCase(res,"user Doesn't exist to be updated. ");
        return;
    };
    let {name,age,password ,email}=req.body;
    //validation on email before update.
    try {
        let newEmailExist= await userModel.findOne({email, _id:{ $ne:id} }) ; // check if the new email is already registered  
        if(newEmailExist){
            failedCase(res,"new email already registered");
            return;
        }
    } catch (error) {
        console.log("what us");
        failedCase(res,error);
    }
    // normal update 
    try {
        let result = await userModel.findByIdAndUpdate(id,{name,email,age,password});
        successCase(res,result);
    } catch (error) {
        failedCase(res,error)
    }
}
const getAllUsers=async (req,res)=>{
    try {
        //, " name email age"
        const users= await userModel.find( { is_deleted:{$ne:true}} );
        successCase(res,users);
    } catch (error) {
        failedCase(res,error);
    }
}
const getUserStartsWith= async(req,res)=>{
    let{start}=req.params
    try {
        const users= await userModel.find({name:{$regex:`^${start}`,$options:"i" } , is_deleted:{$ne:true}});// $option:"i" to make the search case insenstive 
        successCase(res,users);
    } catch (error) {
        failedCase(res,error);
    }
}
const getYouthUsers=async (req,res)=>{// user between 20 and 30
    try {
        let users=await userModel.find({age:{$gte:20,$lte:30 }, is_deleted:{$ne:true} }); // less 
        //less than 30 = age:{$lt:30}
        successCase(res,users);
    } catch (error) {
        failedCase(res,error);
    }
}
async function deleteUser(req, res){
    let {id}= req.params;
    checkUser= await checkUserExist(id);
    if(!checkUser){
        failedCase(res,"user doesnot exist to be deleted");
        return;
    }
    try {
        let result = await userModel.findOneAndRemove({_id:id});
        successCase(res,result);
    } catch (error) {
        failedCase(res,error);
    }
}

const getUser= async(req,res)=>{
    let {id}= req.params;
    checkUser= await checkUserExist(id);
    if(!checkUser){
        failedCase(res,`user with id={${id}} doesn't exist`);
        return;
    }
    try {
        let user = await userModel.findById({_id:id});
        successCase(res,user);
    } catch (error) {
        failedCase(res,error);
    } 
}
async function signin(req,res){
    let{email,password}=req.body;
    let user;
    try {
        user= await userModel.findOne({email});
        console.log(user);
        if(user.password != password){
            failedCase(res,"incorrect password");
            return
        }
        successCase(res,user);
    } catch (error) {
        if(!user)// email Doesnot exist
        error= "email doesn't registered."
        failedCase(res, error);
    }
}
async function softDelete(req,res){
    let {id}=req.params;
    let userCheck= await checkUserExist(id);
    if (!userCheck){
        failedCase(res,`user with id:{${id}} doesn't exist to be dleted`);
        return;
    }
    try {
        let result = await userModel.findByIdAndUpdate(id,{is_deleted:true});
        successCase(res,result);
    } catch (error) {
        failedCase(res,error);
    }

}
module.exports={addUser ,getAllUsers,updateUser,deleteUser ,getUser,signin ,softDelete ,getUserStartsWith ,getYouthUsers} ;