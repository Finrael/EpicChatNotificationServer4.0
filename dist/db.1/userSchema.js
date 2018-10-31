"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
// import corresponding functions from mongoose's module (for the db)
var mongoose_1 = require("mongoose");
var passport_local_mongoose_1 = __importDefault(require("passport-local-mongoose"));
// creates the schema for the db
var registerSchema = new mongoose_1.Schema({
    username: String,
    email: { type: String, unique: true },
    password: String,
    attempts: Number,
    contacts: [{ contact: { type: mongoose_1.SchemaTypes.ObjectId, ref: 'users' }, conversationId: { type: mongoose_1.SchemaTypes.ObjectId, ref: 'conversation' } }],
    language: String,
});
//create the options object and fills the required fields
var options = {};
options.usernameField = 'email';
options.usernameUnique = true;
options.limitAttempts = true;
options.maxAttempts = 5;
// creates the variable to show the error messsages of tyhe type PassportLocalErrorMessages
var errorMessages = {};
errorMessages.IncorrectPasswordError = 'wrong password';
options.errorMessages = errorMessages;
// adds the schema to the passport
registerSchema.plugin(passport_local_mongoose_1.default, options);
exports.default = mongoose_1.model("usersComp", registerSchema);
