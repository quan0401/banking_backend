import { DataTypes, Optional, ModelDefined, CreateOptions, Model, InferAttributes, InferCreationAttributes } from 'sequelize';
import { compare, hash } from 'bcryptjs';
import { sequelize } from '~/database';
import { ISaving } from '~auth/interfaces/userSaving.interface';

// import { AuthModel } from './auth.model';
// import { SavingPlan } from './savingPlan.model';
export const UserSaving: ModelDefined<ISaving, ISaving> = sequelize.define('UserSaving', {
  savingID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // references: {
    //   model: 'User',
    //   key: 'id'
    // }
  },
  balance: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  savingPlanId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // references: {
    //   model: 'SavingPlan',
    //   key: 'id'
    // }
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

// UserSaving.belongsTo(AuthModel, { foreignKey: 'id' });
// UserSaving.belongsTo(SavingPlan, { foreignKey: 'id' });
UserSaving.sync({})
