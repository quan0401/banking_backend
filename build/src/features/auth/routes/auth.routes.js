"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const getCurrentUser_1 = require("../controllers/getCurrentUser");
const signin_1 = require("../controllers/signin");
const signout_1 = require("../controllers/signout");
const signup_1 = require("../controllers/signup");
const updateAuthInfo_1 = require("../controllers/updateAuthInfo");
const verfiy_email_1 = require("../controllers/verfiy-email");
const auth_middleware_1 = require("../../../shared/globals/helpers/auth-middleware");
class AuthRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
    }
    routes() {
        this.router.post('/signup', signup_1.Signup.prototype.signup);
        this.router.post('/signin', signin_1.Signin.prototype.user);
        this.router.post('/signout', signout_1.Signout.prototype.update);
        this.router.post('/verify-email', verfiy_email_1.VerifyEmail.prototype.verify);
        // protected routes
        this.router.get('/auth/currentUser/:authId', auth_middleware_1.verifyUser, getCurrentUser_1.GetCurrentUser.prototype.get);
        this.router.put('/update/info', auth_middleware_1.verifyUser, updateAuthInfo_1.UpdateAuthInfo.prototype.update);
        return this.router;
    }
}
exports.authRoutes = new AuthRoutes();
//# sourceMappingURL=auth.routes.js.map