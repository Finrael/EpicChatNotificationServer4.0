// import corresponding functions from mongoose's module (for the db)
import {
    Document,
    model,
    Schema,
    SchemaTypes,
    SchemaType,
    Mongoose

} from 'mongoose'
import mongoose from 'mongoose'
type ObjectId = typeof SchemaTypes.ObjectId;

interface IContact {
    contact: ObjectId;
    conversationId: ObjectId;
}

export interface IRegisterProps extends Document{
    _id:mongoose.Schema.Types.ObjectId;
    username:string;
    email:string;
    contacts: IContact[];
    language:string;
}
// creates the schema for the db
const userCombSchema = new mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,
username:String,
email:String,
    contacts: [{contact:
        {type:SchemaTypes.ObjectId, ref:'usersComp'}, conversationId:{type:SchemaTypes.ObjectId, ref:'conversation'}} ],
    language:String,
});

export default model<IRegisterProps>("usersComp", userCombSchema) ;