import express, {json} from 'express';
import bodyParser, {Options} from 'body-parser';
import cookieParser from 'cookie-parser';
const app= express();
const port = process.env.PORT || 5002;
import mongoose, {Schema, Model, model} from 'mongoose';
import User from '../db/userSchema';
import passport from 'passport';
import passportLocalMongoose from 'passport-local-mongoose';
import {Session} from 'inspector';
import PasswordJWT from 'passport-jwt';
import endPoints from '../endpoints';
import http from 'http';

mongoose.connect(
    'mongodb://localhost:27017/chatDB', (error: any) => {

        if (error) {
            console.log('error');
            process.exit();
            return
        }
        else {
            console.log('db connected')
        }
    }
)

passport.use(User.createStrategy());
const passportExpressMiddleware = passport.initialize();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(passportExpressMiddleware);
app.use(cookieParser());
app.use('/api',endPoints)
const server = http.createServer(app);
server.listen(port,()=>console.log(`Listening on port ${port}`));