 // imports
 import express, { json } from 'express';
 import cookieParser from 'cookie-parser';
 import bodyParser from 'body-parser';
//  import User from '../db/userSchema';
 import userComp from '../db/userCompSchema';
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
        //   const filter  = {email:response.data.email}
          const listOfAvailableContacts = await userComp.findOne({_id:response.data._id}, {contacts:1})
          .populate({
              path: 'contacts.contact',
              select: 'username  email'
          })
     console.log('this is the available contacts', listOfAvailableContacts)
         res.json(listOfAvailableContacts);

        }
    ).catch(
        function (error){
            console.log('failture axios to getAvailablecontacts')
        }
    )



 
 })

 export default router;