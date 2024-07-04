"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionModel = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../../../database");
const uuid_1 = require("uuid");
exports.TransactionModel = database_1.sequelize.define('transactions', {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: () => (0, uuid_1.v4)()
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    bankAccountId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true
    },
    savingPlanId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    amount: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    isSuccessful: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false
    },
    transactionDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    scheduledDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    transactionType: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
        validate: {
            isIn: {
                args: [[1, -1]], // 1 for purchase, -1 for withdrawal
                msg: 'TransactionType must be 1 or -1 (1 for purchase, -1 for withdrawal)'
            }
        }
    }
}, {
    timestamps: true
});
exports.TransactionModel.sync({
// force: true
});
//# sourceMappingURL=transaction.model.js.map