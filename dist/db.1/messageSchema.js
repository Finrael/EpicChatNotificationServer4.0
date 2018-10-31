"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import corresponding functions from mongoose's module (for the db)
var mongoose_1 = require("mongoose");
// creates the schema for the db
var messageSchema = new mongoose_1.Schema({
    messageText: String,
    messageTime: Date,
    messageOriginator: { _Id: String, name: String },
    conversationId: String,
});
// required sentence to add typings to usermodel
exports.default = mongoose_1.model("message", messageSchema);
