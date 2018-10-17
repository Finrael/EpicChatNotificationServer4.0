 // imports
 import express, { json } from 'express';
 import cookieParser from 'cookie-parser';
 import bodyParser from 'body-parser';
//  import User from '../db/models/messageSchema';
 import passport from 'passport';
 const router = express.Router();
 import jwt, { verify } from 'jsonwebtoken';
 import JWTSECRET from '../constants';
 import passportJWT from 'passport-jwt';
 import message from '../db/messageSchema';
import {Types, Schema} from "mongoose";
import axios from 'axios'

 router.post('/getMessages', async(req,res)=>{

    console.log('sDSA',req.headers.convid)
    axios.post ('http://localhost:5001/api/authenticate',{},{headers:{cookie: req.headers.cookie}})
    
    .then (
  
      async   function async (response){
        const listOfMessages = await message.find({conversationId:req.headers.convid})
        const messagesObject ={
            messageList: listOfMessages,
            conversationId:req.body.convId
        }
     res.json(messagesObject);
        }
    ).catch(
        function (error){
            console.log('failture axios to authenticate')
        }
    )


// res.json(newMessage)
 });
 export default router;