"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin_routes_1 = require("./features/auth/routes/admin.routes");
const auth_routes_1 = require("./features/auth/routes/auth.routes");
const auth_middleware_1 = require("./shared/globals/helpers/auth-middleware");
const savingPlan_routes_1 = require("./features/savingPlan/routes/savingPlan.routes");
const bank_routes_1 = require("./features/transaction/routes/bank.routes");
const transaction_routes_1 = require("./features/transaction/routes/transaction.routes");
const userSaving_routes_1 = require("./features/userSaving/routes/userSaving.routes");
const BASE_URL = '/api/v1';
exports.default = (app) => {
    const routes = () => {
        app.use(BASE_URL, auth_routes_1.authRoutes.routes());
        // Verified routes
        app.use(BASE_URL, auth_middleware_1.verifyUser, savingPlan_routes_1.savingPlanRoutes.routes());
        app.use(BASE_URL, auth_middleware_1.verifyUser, bank_routes_1.bankRoutes.routes());
        app.use(BASE_URL, auth_middleware_1.verifyUser, transaction_routes_1.transactionRoutes.routes());
        app.use(BASE_URL, auth_middleware_1.verifyUser, userSaving_routes_1.userSavingRoutes.routes());
        app.use(BASE_URL, auth_middleware_1.verifyUser, admin_routes_1.adminRoutes.routes());
    };
    routes();
};
//# sourceMappingURL=routes.js.map