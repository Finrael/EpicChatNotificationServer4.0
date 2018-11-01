"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var app = express_1.default();
var port = process.env.PORT || 5002;
var mongoose_1 = __importDefault(require("mongoose"));
var endpoints_1 = __importDefault(require("../endpoints"));
var http_1 = __importDefault(require("http"));
var configFile_1 = require("../configFile");
mongoose_1.default.connect('mongodb://' + configFile_1.mongo_serverAddress + ':' + configFile_1.mongo_serverPort + '/CommsDB', { useNewUrlParser: true }, function (error) {
    if (error) {
        console.log('error', error);
        process.exit();
        return;
    }
    else {
        console.log('db connected');
    }
});
// passport.use(User.createStrategy());
// const passportExpressMiddleware = passport.initialize();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// app.use(passportExpressMiddleware);
app.use(cookie_parser_1.default());
app.use('/api', endpoints_1.default);
var server = http_1.default.createServer(app);
server.listen(port, function () { return console.log("Listening on port " + port); });
