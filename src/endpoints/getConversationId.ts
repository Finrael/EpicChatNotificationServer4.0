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
import user from '../db/userSchema';
import usercomp from '../db/userCompSchema';
import { authenticationServer_Api_Adress } from '../configFile';

router.post('/getConversationId',  async (req, res) => {
    console.log('hello')
    axios.post (authenticationServer_Api_Adress+'/authenticate',{},{headers:{cookie: req.headers.cookie}})
    
    .then (
  
      async   function async (response){
       console.log('enter here', response.data)
       const UserIdObject = new Types.ObjectId(response.data._id)
               console.log(UserIdObject);
               const UserData = await usercomp.findOne({_id:  UserIdObject  })
               console.log('THISD IS THE CONVERSATION DATA', UserData)
               console.log('conversation data', UserData!.contacts[0].conversationId, '--------------------------------')
        res.json(UserData)
        }
    ).catch(
        function (error){
            console.log('failture axios to authenticate')
        }
    )
});
export default router;