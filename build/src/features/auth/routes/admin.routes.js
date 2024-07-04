"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const express_1 = require("express");
const admin_1 = require("../controllers/admin");
const signup_1 = require("../controllers/signup");
const auth_middleware_1 = require("../../../shared/globals/helpers/auth-middleware");
class AminRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
    }
    routes() {
        // protected routes
        this.router.post('/admin/auth/seed/:count', auth_middleware_1.verifyUser, signup_1.Signup.prototype.seed);
        this.router.get('/admin/auth/:offset/:limit', auth_middleware_1.verifyUser, admin_1.Admin.prototype.getUsers);
        this.router.get('/admin/auth/:id', auth_middleware_1.verifyUser, admin_1.Admin.prototype.getUserById);
        return this.router;
    }
}
exports.adminRoutes = new AminRoutes();
//# sourceMappingURL=admin.routes.js.map