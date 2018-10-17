 // imports
 import express, { json } from 'express';
 import cookieParser from 'cookie-parser';
 import bodyParser from 'body-parser';
 import User from '../db/userSchema';
 import passport from 'passport';
 const router = express.Router();
 import jwt, { verify } from 'jsonwebtoken';
 import passportJWT from 'passport-jwt';
 import axios from 'axios'
 
 router.use('/setLanguage',   async(req,res)=>{
    let auxdata = {};
    let filter;
     console.log('this user =', req.headers.cookie)
    axios.post ('http://localhost:5001/api/authenticate',{},{headers:{cookie: req.headers.cookie}})
    .then (
        
      async   function async (response){
            console.log('response',response.data)
            auxdata = response.data;
             filter={_id:response.data._id};
             console.log('idioma_', req.headers.language)
   
             const update={language:req.headers.language}
             const updateLanguage = await User.update(filter,update);
            //  res.json(updateLanguage);
           
            // return response.json().th
        }
    ).catch(
        function (error){
            console.log('failture axios to authenticate')
        }
    )
   

 // console.log('from authenticate getProfile ',req.user);
//     let filter={_id:req.user!._id};
//     const update={language:req.body.language}
//     const updateLanguage = await User.update(filter,update);
//  res.json(updateLanguage);
res.end()
 });
 export default router;