import { DataTypes, Optional, ModelDefined, CreateOptions, Model, InferAttributes, InferCreationAttributes } from 'sequelize';
import { compare, hash } from 'bcryptjs';
import { sequelize } from '~/database';

import { AuthModel } from './auth.model';
//import { SavingPlan } from './savingPlan.model';
export const UserSaving = sequelize.define('UserSaving', {
  savingID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id'
    }
  },
  balance: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  savingplanID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'SavingPlan',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Date.now
  }
});

UserSaving.belongsTo(AuthModel, { foreignKey: 'userId' });
//UserSaving.belongsTo(SavingPlan, { foreignKey: 'savingplanID' });
