const { failedCase, successCase, checkUserExist } = require("../generalFunctions");
const messageModel = require("./messages.Model");


const getAllMessages= async(req,res)=>{
    try {
        let messages=await messageModel.find({});
        successCase(res,messages);
    } catch (error) {
        failedCase(res,error);
    }
}

const addMessage= async(req,res)=>{
    const {content,sendTo,sendBy} = req.body;
    checkSenderExist=await checkUserExist(sendBy);
    checkReciverExist= await checkUserExist(sendTo);
    if( !checkReciverExist ){
        failedCase(res , `reciver Doesn't Exist `);
        return;
    }
    if( !checkSenderExist ){
        failedCase(res , `Sender" Doesn't Exist `);
        return;
    }

    try {
        let message = new messageModel({content,sendTo,sendBy});
        let {_id}= await message.save();
        successCase(res,_id);
    } catch (error) {
        failedCase(res,error);
    }
}

function checkMessageExist(id){
    return new Promise( async (x)=>{
        try {
            let message = await messageModel.findById(id);
            console.log(message);
            if(message){
                x(true);
            }
            else {
                x(false);
            }
        } catch (error) {
            console.log("error in finding message by ID " +id);
        }
    })
}

async function getMessageWithUserInfo(req,res){
    // if a specific message will be printed by its Id passed as url parameter .
 /*   const {id}= req.params;
    let checkMessgae= await checkMessageExist(id);
    if(!checkMessgae){
        failedCase(res,"messgae doesnot exist to print its info");
        return;
    }*/
    try {
        //{path:"sendTo",select:"name"}
        let messagesInfo = await messageModel.find({}).populate({path:"sendBy sendTo",select:"name email"});
        successCase(res,messagesInfo);
    } catch (error) {
        failedCase(res,error);
    }
}

module.exports={getAllMessages,addMessage,getMessageWithUserInfo};