"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSavingModel = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../../../database");
const uuid_1 = require("uuid");
exports.UserSavingModel = database_1.sequelize.define('userSaving', {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: () => (0, uuid_1.v4)()
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    savingPlanId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    totalAmount: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: {
                args: [0],
                msg: 'Total amount must be greater than 0'
            }
        }
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date() // Default to current date and time
    },
    currency: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'VND'
    },
    targetAmount: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true
    }
}, {
    version: true,
    timestamps: true
});
exports.UserSavingModel.sync({
// force: true
});
//# sourceMappingURL=userSaving.model.js.map