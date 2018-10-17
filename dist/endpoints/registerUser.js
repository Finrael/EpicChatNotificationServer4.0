"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var userSchema_1 = __importDefault(require("../db/userSchema"));
var registerUserCompInfo_1 = __importDefault(require("./registerUserCompInfo"));
var router = express_1.default.Router();
router.post('/registerUser', function (req, res) {
    console.log('it went in', req.body);
    var post = new userSchema_1.default({
        email: req.body.email,
    });
    post.setPassword(req.body.password, function (err, user) {
        if (err) {
            return res.status(500).end("Could not set password");
        }
        user.save(function (err) {
            if (err) {
                res.status(500).end("server error while saving");
                console.log('error on saving', err);
                throw err;
            }
            else {
                console.log("user saved successfully");
                res.end();
                router.use(registerUserCompInfo_1.default);
            }
        });
    });
});
exports.default = router;
