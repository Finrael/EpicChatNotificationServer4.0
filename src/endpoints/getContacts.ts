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
 import axios from 'axios'

router.use ('/getContacts', (req,res)=>{
console.log('---------------------------->',req.headers.emailtolookfor)
let stringGuard:string ='';
    axios.post ('http://localhost:5001/api/authenticate',{},{headers:{cookie: req.headers.cookie}})
    .then (
  
      async   function async (response){
        if (typeof req.headers.emailtolookfor==='string'){
           stringGuard= req.headers.emailtolookfor;
        }
          console.log('response from authenticate omtp getContacts',response.data);
          console.log('this is the email we a re looking for ',req.headers.emailToLookFor)
          const filter  = {_id:response.data._id}
        const aux = await User.find({email:new RegExp(stringGuard)},{_id:1, email:1, name:1} )
        console.log(aux)
        res.json(aux);

        }
    ).catch(
        function (error){
            console.log('failture axios to authenticate')
        }
    )



  
})
export default router