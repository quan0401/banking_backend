"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankAccountModel = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../../../database");
const uuid_1 = require("uuid");
exports.BankAccountModel = database_1.sequelize.define('bankAccounts', {
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
    // Bank account holder's name
    accountHolder: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    // Bank name
    bankName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    // Bank account number
    accountNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    // Owner information
    ownerAddress: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    ownerContact: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    // Account type (e.g., savings, checking, momo)
    accountType: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    // Currency of the account
    currency: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'VND' // Default currency
    },
    // Branch of the bank associated with the account
    branch: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    // Account status (active, closed, etc.)
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: 'active'
    }
    // Additional fields...
}, {
    timestamps: true
});
exports.BankAccountModel.sync({});
//# sourceMappingURL=bankAccount.model.js.map