"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
// imports
var express_1 = __importDefault(require("express"));
// import User from '../db/userSchema';
var userCompSchema_1 = __importDefault(require("../db/userCompSchema"));
var router = express_1.default.Router();
var conversationSchema_1 = __importDefault(require("../db/conversationSchema"));
var axios_1 = __importDefault(require("axios"));
router.post('/addContacts', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log('selected user', req.headers.usertoadd, 'requesting user', req.headers.email);
        axios_1.default.post('http://localhost:5001/api/authenticate', {}, { headers: { cookie: req.headers.cookie } })
            .then(function async(response) {
            return __awaiter(this, void 0, void 0, function () {
                var newContact, filter, filter2, creationDate, newConversation, generateConversation, update, update2, updateUser, updateUser2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log('response from authenticate omtp addContacts', response.data);
                            return [4 /*yield*/, userCompSchema_1.default.findOne({ email: req.headers.usertoadd })];
                        case 1:
                            newContact = _a.sent();
                            console.log('dssfasdfa', newContact);
                            // const contactToLookFor = newContact!.userId;
                            // const checkForContactPresence = await userComp.find({ email: req.headers.email, contacts: { "$in": [contactToLookFor] } });
                            console.log('hello', newContact);
                            filter = { email: req.headers.email };
                            filter2 = { email: newContact.email };
                            creationDate = new Date();
                            newConversation = {
                                participants: [{ participant: response.data._id, joinedDate: creationDate, status: 1 },
                                    { participant: newContact._id, joinedDate: creationDate, status: 1 }],
                                creationTime: creationDate,
                            };
                            console.log('blavbla');
                            return [4 /*yield*/, conversationSchema_1.default.create(newConversation)];
                        case 2:
                            generateConversation = _a.sent();
                            update = { $push: { contacts: { contact: newContact, conversationId: generateConversation._id } } };
                            update2 = { $push: { contacts: { contact: response.data._id, conversationId: generateConversation._id } } };
                            return [4 /*yield*/, userCompSchema_1.default.update(filter, update)];
                        case 3:
                            updateUser = _a.sent();
                            return [4 /*yield*/, userCompSchema_1.default.update(filter2, update2)];
                        case 4:
                            updateUser2 = _a.sent();
                            res.end('Contact saved');
                            // }else{console.log('problem to save contacts');
                            res.end();
                            return [2 /*return*/];
                    }
                });
            });
        }
        // }
        ).catch(function (error) {
            console.log('failture axios to save');
        });
        return [2 /*return*/];
    });
}); });
exports.default = router;
