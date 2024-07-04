"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavingPlanModel = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../../../database");
const uuid_1 = require("uuid");
exports.SavingPlanModel = database_1.sequelize.define('savingPlans', {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: () => (0, uuid_1.v4)()
    },
    termPeriod: {
        type: sequelize_1.DataTypes.INTEGER, // Changed data type to INTEGER
        allowNull: false
    },
    minimumBalance: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    maximumBalance: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    minimumEachTransaction: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    maximumEachTransaction: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true
    },
    interestRate: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    interestRateBeforeDueDate: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    basicDescription: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    isActive: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    startDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    endDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    currency: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'VND' // Default currency
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    version: true
});
// You might want to handle the sync operation in a try-catch block to catch any errors.
exports.SavingPlanModel.sync({
// force: true
});
//# sourceMappingURL=savingPlan.model.js.map