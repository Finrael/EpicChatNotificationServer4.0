"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var app = express_1.default();
var router = express_1.default.Router();
var userSchema_1 = __importDefault(require("../db/userSchema"));
var constants_1 = __importDefault(require("../constants"));
var JwtStrategy = require('passport-jwt').Strategy, ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {
    secretOrKey: constants_1.default,
    jwtFromRequest: function (req) {
        var token = null;
        if (req && req.cookies) {
            token = req.cookies['CookieUser'];
        }
        // console.log('this is the token: ', token)
        return token;
    }
};
passport_1.default.use(new JwtStrategy(opts, function (jwt_payload, done) {
    // console.log('payload', jwt_payload);
    userSchema_1.default.findOne({ _id: jwt_payload._id }, { _id: 1, username: 1, email: 1 }, function (err, user) {
        if (err) {
            done(err, false);
        }
        if (user) {
            done(null, user);
        }
        else {
            done(null, false);
        }
    });
}));
exports.default = passport_1.default;
