// imports
import express, { json } from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import UserComb from '../db/userCompSchema';
import passport from 'passport';
const router = express.Router();
import jwt, { verify } from 'jsonwebtoken';
import passportJWT from 'passport-jwt';
router.post('/addUserExtraInfo',  async (req, res) => {
    try {
        console.log('into extras', req.body)

        const compUser = {
            _id:req.body.id,
            email: req.body.email,
            username: req.body.username,
            contacts: [],
            language:req.body.language,
         }

         const generateCombUser = await UserComb.create(compUser);

            res.end('Contact saved');
    } catch (e) {
        console.log('error: ', e);
        res.status(500)
    }
});


export default router