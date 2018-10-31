 // imports
 import express, { json } from 'express';
 import cookieParser from 'cookie-parser';
 import bodyParser from 'body-parser';
 import userComb from '../db/userCompSchema';
 import passport from 'passport';
 const router = express.Router();
 import jwt, { verify } from 'jsonwebtoken';
 import passportJWT from 'passport-jwt';
 import axios from 'axios'
 import {authenticationServer_Api_Adress} from '../configFile'

 router.use('/setLanguage',   async(req,res)=>{
    let auxdata = {};
    let filter;
     console.log('this user =', req.headers.cookie)
    axios.post (authenticationServer_Api_Adress+'/authenticate',{},{headers:{cookie: req.headers.cookie}})
    .then (
        
      async   function async (response){
            console.log('response',response.data)
            auxdata = response.data;
             filter={_id:response.data._id};
             console.log('idioma_', req.headers.language)
   
             const update={language:req.headers.language}
             const updateLanguage = await userComb.update(filter,update);
            //  res.json(updateLanguage);
           res.end();
            // return response.json().th
        }
    ).catch(
        function (error){
            console.log('failture axios to authenticate')
        }
    )
   


res.end()
 });
 export default router;