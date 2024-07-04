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
exports.connectDatabae = exports.sequelize = void 0;
const ecommerce_shared_1 = require("@quan0401/ecommerce-shared");
const sequelize_1 = require("sequelize");
const config_1 = require("./config");
const log = (0, ecommerce_shared_1.consoleLogger)('database', 'debug');
exports.sequelize = new sequelize_1.Sequelize(config_1.config.MYSQL_DB, {
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
        multipleStatements: true
    }
}); // Example for postgres
const connectDatabae = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.sequelize.authenticate();
        log.info('Connect to database successfully!');
    }
    catch (error) {
        log.error('Error connect to database', error);
    }
});
exports.connectDatabae = connectDatabae;
//# sourceMappingURL=database.js.map