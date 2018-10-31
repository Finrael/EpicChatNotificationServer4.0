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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_1 = __importDefault(require("socket.io"));
var jwt = __importStar(require("jsonwebtoken"));
var userSchema_1 = __importDefault(require("../db/userSchema"));
// import * as cookieParser from 'socket.io-cookie-parser'
var constants_1 = __importDefault(require("../constants"));
function Config(server) {
    var _this = this;
    exports.io = socket_io_1.default(server);
    exports.io.use(function (socket, next) { return __awaiter(_this, void 0, void 0, function () {
        var cookie, spreadCookie1, spreadCookie2, verifyHolder, aux, UserData, i, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('this socket ', socket.request.headers.cookie);
                    cookie = socket.request.headers.cookie;
                    spreadCookie1 = cookie.split(';');
                    spreadCookie2 = spreadCookie1[0].split('=');
                    verifyHolder = jwt.verify(spreadCookie2[1], constants_1.default);
                    //  let verifyHolder2 = JSON.parse(verifyHolder)        
                    console.log('spreadcookoe', verifyHolder);
                    if (!verifyHolder) return [3 /*break*/, 4];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    aux = void 0;
                    console.log('form the cookie???');
                    return [4 /*yield*/, userSchema_1.default.findOne({ _id: verifyHolder._id })];
                case 2:
                    UserData = _a.sent();
                    console.log('conversation data', UserData.contacts[0].conversationId, '--------------------------------');
                    for (i = 0; UserData.contacts.length > i; i++) {
                        aux = UserData.contacts[i].conversationId.toString();
                        socket.join(aux);
                        console.log(aux);
                    }
                    socket.join(verifyHolder._id);
                    next();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    console.log(e_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    exports.io.on('connection', function (socket) {
        // socket.on('ss',(data)=>{console.log('Socket component online')
        exports.io.emit('This is for some reason an event', 'this is to be send');
    });
}
exports.Config = Config;
