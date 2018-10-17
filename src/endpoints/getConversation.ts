// imports
import express, { json } from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from 'passport';
const router = express.Router();
import jwt, { verify } from 'jsonwebtoken';
import JWTSECRET from '../constants';
import passportJWT from 'passport-jwt';
import conversation from '../db/conversationSchema';
import { Types, Schema } from "mongoose";
import axios from 'axios'

router.post('/getConversation',  async (req, res) => {
    console.log(req.headers.convid)
    axios.post ('http://localhost:5001/api/authenticate',{},{headers:{cookie: req.headers.cookie}})
    
    .then (
  
      async   function async (response){
       console.log('enter here')
        const conversationData = await conversation.findOne({ _id: req.headers.convid }, { participants: 1, creationTime: 1, _id:1 })
        console.log('from get conversations', conversationData, '----------------------------------------')
        res.json(conversationData);
        }
    ).catch(
        function (error){
            console.log('failture axios to authenticate')
        }
    )





});
export default router;