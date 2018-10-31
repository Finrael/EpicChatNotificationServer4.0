"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
// import corresponding functions from mongoose's module (for the db)
var mongoose_1 = require("mongoose");
var mongoose_2 = __importDefault(require("mongoose"));
// creates the schema for the db
var userCombSchema = new mongoose_2.default.Schema({
    _id: mongoose_2.default.Schema.Types.ObjectId,
    username: String,
    email: String,
    contacts: [{ contact: { type: mongoose_1.SchemaTypes.ObjectId, ref: 'usersComp' }, conversationId: { type: mongoose_1.SchemaTypes.ObjectId, ref: 'conversation' } }],
    language: String,
});
exports.default = mongoose_1.model("usersComp", userCombSchema);
