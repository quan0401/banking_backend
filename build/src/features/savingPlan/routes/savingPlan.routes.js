"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.savingPlanRoutes = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../../../shared/globals/helpers/auth-middleware");
const createSavingPlan_1 = require("../controllers/createSavingPlan");
const deleteSavingPlan_1 = require("../controllers/deleteSavingPlan");
const getSavingPlan_1 = require("../controllers/getSavingPlan");
const updateSavingPlan_1 = require("../controllers/updateSavingPlan");
class SavingPlanRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
    }
    routes() {
        this.router.get('/savingPlan/:planId', getSavingPlan_1.GetSavingPlan.prototype.getById);
        this.router.get('/savingPlan', getSavingPlan_1.GetSavingPlan.prototype.all);
        this.router.post('/savingPlan', auth_middleware_1.verifyAdmin, createSavingPlan_1.CreateSavingPlan.prototype.create);
        this.router.put('/savingPlan/:planId', auth_middleware_1.verifyAdmin, updateSavingPlan_1.UpdateSavingPlan.prototype.byId);
        this.router.delete('/savingPlan/:planId', auth_middleware_1.verifyAdmin, deleteSavingPlan_1.DeleteSavingPlan.prototype.byId);
        return this.router;
    }
}
exports.savingPlanRoutes = new SavingPlanRoutes();
//# sourceMappingURL=savingPlan.routes.js.map