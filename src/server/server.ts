import express, {json} from 'express';
import bodyParser, {Options} from 'body-parser';
import cookieParser from 'cookie-parser';
const app= express();
const port = process.env.PORT || 5002;
import mongoose, {Schema, Model, model} from 'mongoose';
import User from '../db/userCompSchema';
import passport from 'passport';
import passportLocalMongoose from 'passport-local-mongoose';
import {Session} from 'inspector';
import PasswordJWT from 'passport-jwt';
import endPoints from '../endpoints';
import http from 'http';
import {mongo_serverAddress, mongo_serverPort} from '../configFile'
mongoose.connect(
    'mongodb://'+mongo_serverAddress+':'+mongo_serverPort+'/CommsDB',{useNewUrlParser:true}, (error: any) => {

        if (error) {
            console.log('error', error);
            process.exit(); 
            return
        }
        else {
            console.log('db connected')
        }
    }
)

// passport.use(User.createStrategy());
// const passportExpressMiddleware = passport.initialize();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// app.use(passportExpressMiddleware);
app.use(cookieParser());
app.use('/api',endPoints)
const server = http.createServer(app);
server.listen(port,()=>console.log(`Listening on port ${port}`));