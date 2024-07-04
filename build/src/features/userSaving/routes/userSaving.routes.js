"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSavingRoutes = void 0;
const express_1 = require("express");
const getUserSaving_1 = require("../controllers/getUserSaving");
class UserSavingRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
    }
    routes() {
        this.router.get('/userSaving/:userId', getUserSaving_1.GetUserSaving.prototype.getByUserId);
        this.router.get('/userSaving/:userId/:savingPlanId', getUserSaving_1.GetUserSaving.prototype.getBySavingPlanId);
        return this.router;
    }
}
exports.userSavingRoutes = new UserSavingRoutes();
//# sourceMappingURL=userSaving.routes.js.map