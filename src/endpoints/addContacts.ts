// imports
import express, { json } from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
// import User from '../db/userSchema';
import userComp from '../db/userCompSchema';
import passport from 'passport';
const router = express.Router();
import jwt, { verify } from 'jsonwebtoken';
import JWTSECRET from '../constants';
import passportJWT from 'passport-jwt';
import conversation from '../db/conversationSchema';
import moment from 'moment';
import axios from 'axios'

router.post('/addContacts', async (req, res) => {
    console.log('selected user', req.headers.usertoadd, 'requesting user',req.headers.email)
    axios.post ('http://localhost:5001/api/authenticate',{},{headers:{cookie: req.headers.cookie}})
    .then (
  
      async   function async (response){

          console.log('response from authenticate omtp addContacts',response.data);
  const newContact = await userComp.findOne({ email: req.headers.usertoadd }, )
  console.log('dssfasdfa', newContact)
        // const contactToLookFor = newContact!.userId;
        // const checkForContactPresence = await userComp.find({ email: req.headers.email, contacts: { "$in": [contactToLookFor] } });
        console.log('hello', newContact)
        // if (checkForContactPresence.length === 0) {
            let filter = { email: req.headers.email };
            let filter2 = {email: newContact!.email}
            const creationDate = new Date()
            const newConversation = {
                participants: [{ participant: response.data._id, joinedDate: creationDate, status: 1 },
                { participant: newContact!._id, joinedDate: creationDate, status: 1 }],
                creationTime: creationDate,
            }
            console.log('blavbla')
            const generateConversation = await conversation.create(newConversation);
            let update = { $push: { contacts: { contact: newContact, conversationId: generateConversation._id } } };
            let update2= { $push: { contacts: { contact: response.data._id, conversationId: generateConversation._id } } };
            const updateUser = await userComp.update(filter, update)
            const updateUser2 = await userComp.update(filter2,update2);
            res.end('Contact saved');

        // }else{console.log('problem to save contacts');
        res.end()}
    // }
    ).catch(
        function (error){
            console.log('failture axios to save')
        }
    )

    // try {
        // console.log('emailtolookfor ', req.body)
        // req.body.email='a3'

      
    //     } else {
    //         res.end('Contact can not be saved')
    //     }
    //     // console.log('postRegister is in: ', req.body);
    // } catch (e) {
    //     console.log('error: ', e);
    //     res.status(500)
    // }

    // res.end();
});


export default router