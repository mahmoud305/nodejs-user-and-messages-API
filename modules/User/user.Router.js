const { baseURL } = require("../generalFunctions");
const { addUser, getAllUsers, updateUser, deleteUser, getUser, signin, softDelete, getUserStartsWith, getYouthUsers } = require("./user.Controller");

const userRouter= require("express").Router();


//base URL for user Api 
//const baseURL= "/Assingment7" ;
userRouter.post( `${baseURL}/signup`,addUser);
userRouter.get(`${baseURL}/getUsers` ,getAllUsers);
userRouter.put(`${baseURL}/editUser/:id` ,updateUser);
userRouter.delete(`${baseURL}/removeUser/:id` ,deleteUser);
userRouter.get(`${baseURL}/getUser/:id` ,getUser );
userRouter.post( `${baseURL}/signin`,signin);
userRouter.delete(`${baseURL}/softDeleteUser/:id` ,softDelete);
userRouter.get(`${baseURL}/getUsersStartWith/:start` ,getUserStartsWith);
userRouter.get(`${baseURL}/getYouthUsers` ,getYouthUsers);

module.exports=userRouter;