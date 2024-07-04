"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppServer = void 0;
const ecommerce_shared_1 = require("@quan0401/ecommerce-shared");
const compression_1 = __importDefault(require("compression"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const cors_1 = __importDefault(require("cors"));
const express_1 = require("express");
const helmet_1 = __importDefault(require("helmet"));
const hpp_1 = __importDefault(require("hpp"));
const http_1 = require("http");
require("express-async-errors");
const database_1 = require("./database");
const routes_1 = __importDefault(require("./routes"));
const config_1 = require("./config");
const http_status_codes_1 = require("http-status-codes");
const PORT = 6969;
const log = (0, ecommerce_shared_1.consoleLogger)('AppServer', 'debug');
class AppServer {
    constructor(app) {
        this.app = app;
    }
    start() {
        this.securityMiddleware(this.app);
        this.standardMiddleware(this.app);
        this.routesMiddleware(this.app);
        this.globalErrorHandler(this.app);
        this.startHttpServer(this.app);
        (0, database_1.connectDatabae)();
    }
    startHttpServer(app) {
        const httpServer = new http_1.Server(app);
        httpServer.listen(PORT, () => {
            log.info(`Server is running on port ${PORT}`);
        });
    }
    standardMiddleware(app) {
        app.use((0, compression_1.default)());
        app.use((0, express_1.json)({ limit: '200mb' }));
        app.use((0, express_1.urlencoded)({ extended: true, limit: '200mb' }));
    }
    securityMiddleware(app) {
        app.use((0, cookie_session_1.default)({
            name: 'session',
            keys: [config_1.config.SECRET_KEY_ONE, config_1.config.SECRET_KEY_TWO],
            maxAge: 3600 * 1000,
            secure: config_1.config.NODE_ENV !== 'development'
        }));
        app.use((0, hpp_1.default)());
        app.use((0, helmet_1.default)());
        app.use((0, cors_1.default)({
            origin: config_1.config.CLIENT_URL,
            credentials: true,
            optionsSuccessStatus: 200,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
        }));
    }
    routesMiddleware(app) {
        (0, routes_1.default)(app);
    }
    globalErrorHandler(app) {
        app.all('*', (req, res) => {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send('What!!! this route is not existed');
        });
        app.use((err, req, res, next) => {
            log.error(err);
            if (err instanceof ecommerce_shared_1.CustomeError) {
                // Send back to the client
                return res.status(err.serializeError().statusCode).json(err.serializeError());
            }
            else {
                log.error(err);
            }
            next();
        });
    }
}
exports.AppServer = AppServer;
//# sourceMappingURL=server.js.map