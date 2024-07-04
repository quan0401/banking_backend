"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdmin = exports.checkAuthentication = exports.verifyUser = void 0;
const ecommerce_shared_1 = require("@quan0401/ecommerce-shared");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../../../config");
const auth_service_1 = require("../../services/db/auth.service");
const log = (0, ecommerce_shared_1.consoleLogger)('auth-middleware', 'debug');
const verifyUser = (req, res, next) => {
    var _a;
    try {
        if (!((_a = req.session) === null || _a === void 0 ? void 0 : _a.jwt))
            throw new ecommerce_shared_1.NotAuthorizedError('Token is not available. Please login...', 'verifyuser');
        const payload = (0, jsonwebtoken_1.verify)(req.session.jwt, config_1.config.JWT_TOKEN);
        req.currentUser = payload;
    }
    catch (error) {
        log.error('Token is not available', error);
        throw new ecommerce_shared_1.NotAuthorizedError('Token is not available', 'verifyuser');
    }
    next();
};
exports.verifyUser = verifyUser;
const checkAuthentication = (req, res, next) => {
    try {
        if (!(req === null || req === void 0 ? void 0 : req.currentUser))
            throw new ecommerce_shared_1.NotAuthorizedError('Token is not available. Please login...', 'checkAuthentication');
    }
    catch (error) {
        log.error('Token is not available', error);
        throw new ecommerce_shared_1.NotAuthorizedError('Token is not available', 'checkAuthentication');
    }
    next();
};
exports.checkAuthentication = checkAuthentication;
const verifyAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let payload;
    try {
        if (!((_a = req.session) === null || _a === void 0 ? void 0 : _a.jwt))
            throw new ecommerce_shared_1.NotAuthorizedError('Token is not available. Please login...', 'verifyAdmin');
        payload = (0, jsonwebtoken_1.verify)(req.session.jwt, config_1.config.JWT_TOKEN);
    }
    catch (error) {
        log.error('Token is not available', error);
        throw new ecommerce_shared_1.NotAuthorizedError('Token is not available', 'verifyAdmin');
    }
    const isAdmin = yield auth_service_1.authService.isAdmin(payload.id);
    if (!isAdmin)
        throw new ecommerce_shared_1.NotAuthorizedError("You don't have permission to execute this.", 'verifyAdmin');
    next();
});
exports.verifyAdmin = verifyAdmin;
//# sourceMappingURL=auth-middleware.js.map