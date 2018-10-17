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
 import axios from 'axios';
 
 router.use('/getAvailablecontacts',  async(req,res)=>{
    //  console.log('req.user: ',req.user)
    axios.post ('http://localhost:5001/api/authenticate',{},{headers:{cookie: req.headers.cookie}})
    .then (
  
      async   function async (response){
 
          console.log('response from authenticate omtp getContacts',response.data);
          const filter  = {_id:response.data._id}
          const listOfAvailableContacts = await User.findOne({_id:response.data._id}, {contacts:1})
          .populate({
              path: 'contacts.contact',
              select: 'username  email'
          })
     
         res.json(listOfAvailableContacts);

        }
    ).catch(
        function (error){
            console.log('failture axios to authenticate')
        }
    )



 
 })

 export default router;