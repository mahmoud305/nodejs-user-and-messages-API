/**
 * author : Mahmoud Abo-Hgr .
 * Backend Node.js
 */

const express = require('express');
const connectToDatabase  = require('./config/dbConfig');
const messageRouter = require('./modules/Messages/messages.Router');
const userRouter = require('./modules/User/user.Router');
const app = express();
require("dotenv").config()
const port = process.env.PORT 
app.use(express.json())
app.use(userRouter);
app.use(messageRouter);
connectToDatabase();
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
