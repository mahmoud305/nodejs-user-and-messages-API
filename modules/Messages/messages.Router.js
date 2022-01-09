const messageRouter= require("express").Router();
const { baseURL } = require("../generalFunctions");
const { getAllMessages, addMessage, getMessageWithUserInfo } = require("./messgaes.Controller");


messageRouter.get(`${baseURL}/getAllMessages`,getAllMessages);
messageRouter.post(`${baseURL}/addMessage`,addMessage);
messageRouter.get(`${baseURL}/getMessagesInfo/:id`, getMessageWithUserInfo);


module.exports= messageRouter;