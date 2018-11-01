"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var registerUserCompInfo_1 = __importDefault(require("./registerUserCompInfo"));
var setLanguage_1 = __importDefault(require("./setLanguage"));
var getContacts_1 = __importDefault(require("./getContacts"));
var addContacts_1 = __importDefault(require("./addContacts"));
var getAvailableContacts_1 = __importDefault(require("./getAvailableContacts"));
var getConversation_1 = __importDefault(require("./getConversation"));
var getMessages_1 = __importDefault(require("./getMessages"));
var message_1 = __importDefault(require("./message"));
var getConversationId_1 = __importDefault(require("./getConversationId"));
var express_1 = require("express");
var router = express_1.Router();
router.use(registerUserCompInfo_1.default);
router.use(setLanguage_1.default);
router.use(getContacts_1.default);
router.use(addContacts_1.default);
router.use(getAvailableContacts_1.default);
router.use(getConversation_1.default);
router.use(getMessages_1.default);
router.use(message_1.default);
router.use(getConversationId_1.default);
exports.default = router;
