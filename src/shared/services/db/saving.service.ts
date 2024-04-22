import { IAuthDocument } from '~auth/interfaces/auth.interface';
import { UserSaving } from '~auth/models/userSaving.model';
import { AuthModel } from '~auth/models/auth.model';
import { ISaving } from '~auth/interfaces/userSaving.interface';

import { IErrorResponse } from '@quan0401/ecommerce-shared';
import { omit } from 'lodash';
import { Model, Op } from 'sequelize'; // Import ValidationError from Sequelize
import { IsUnion } from 'joi';
import { float, integer } from '@elastic/elasticsearch/lib/api/types';

class SavingService {
  async openSaving(data: ISaving): Promise<ISaving | IErrorResponse> {
    try {
      const saving = await UserSaving.create(data);

      return saving.toJSON();
    } catch (error: any) {
      return {
        message: error?.errors[0]?.message,
        statusCode: -1,
        status: 'error',
        comingFrom: 'SavingService openSaving'
      } as IErrorResponse;
    }
  }
  async updateBalanceWithdraw(userID: number, savingID: number, balance: number): Promise<boolean> {
    try {
      const userSaving = await UserSaving.findByPk(savingID);
      const userData = await AuthModel.findByPk(userID);

      if (!userSaving) {
        throw new Error('Saving record not found');
      }
      if (!userData) {
        throw new Error('Saving record not found');
      }

      //use userId to find user and update the balance

      userSaving.dataValues.balance -= balance;

      if (userSaving.dataValues.balance === 0) {
        userSaving.dataValues.status = false;
      }

      await UserSaving.update(
        { balance: userSaving.dataValues.balance, status: userSaving.dataValues.status },
        {
          where: { savingID }
        }
      );
      await AuthModel.update(
        { balance: userData.dataValues.balance },
        {
          where: { userID }
        }
      );

      return true;
    } catch (error) {
      console.error('Error updating balance:', error);
      return false;
    }
  }
  async updateBalanceDeposit(userID: number, savingID: number, balance: number): Promise<boolean> {
    try {
      const userSaving = await UserSaving.findByPk(savingID);
      const userData: Model<IAuthDocument> = (await AuthModel.findByPk(userID)) as Model<IAuthDocument>;
      if (!userSaving) {
        throw new Error('Saving record not found');
      }
      if (!userData) {
        throw new Error('Saving record not found');
      }

      //use userId to find user and update the balance

      userSaving.dataValues.balance += balance;
      userData.dataValues.balance -= balance;

      await UserSaving.update(
        { balance: userSaving.dataValues.balance, status: userSaving.dataValues.status },
        {
          where: { savingID }
        }
      );
      await AuthModel.update(
        { balance: userData.dataValues.balance },
        {
          where: { userID }
        }
      );

      return true;
    } catch (error) {
      console.error('Error updating balance:', error);
      return false;
    }
  }
}

export const savingService: SavingService = new SavingService();
