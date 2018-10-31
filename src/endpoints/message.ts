 // imports
 import express, { json } from 'express';
 import cookieParser from 'cookie-parser';
 import bodyParser from 'body-parser';
 import User from '../db/userSchema';
 import passport from 'passport';
 const router = express.Router();
 import jwt, { verify } from 'jsonwebtoken';
 import JWTSECRET from '../constants';
 import passportJWT from 'passport-jwt';
 import message from '../db/messageSchema';
import {Types, Schema} from "mongoose";
import axios from 'axios';
import { authenticationServer_Api_Adress } from '../configFile';
// import  {io} from '../SocketConfig'
 router.use('/message', async(req,res)=>{
//  console.log('from authenticate getProfile ',req.user);
console.log('Enter into message:',req.headers.convid,' The text is ', req.headers.textmessage)
let convIDtypeguard='';
axios.post (authenticationServer_Api_Adress+'/authenticate',{},{headers:{cookie: req.headers.cookie}})

.then (

  async   function async (response){
      console.log('response.data._id', response.data._id, 'response.data.name', response.data.username);
    if (typeof req.headers.convid==='string'){
    convIDtypeguard = req.headers.convid;
    }
    const creationDate = new Date()
    const newMessage = {
       messageText: req.headers.textmessage,
       messageTime:creationDate,
       messageOriginator:{_Id:response.data._id, name:response.data.username},
       conversationId: new Types.ObjectId(convIDtypeguard),
    }
    const generateMessage = await message.create(newMessage);
    const responseToMessage={
        message:generateMessage,
        convId:convIDtypeguard
    }
   //  console.log(generateMessage)
    // res.json(generateMessage);
    res.json(responseToMessage)
    }
).catch(
    function (error){
        console.log('failture axios to authenticate')
    }
)
 

//  io.to(req.body.convId).emit('newMessage',generateMessage )

 console.log('it whent int to /message', req.body.convId)

// res.json(newMessage)
 });
 export default router;