import { UserSaving } from "~auth/models/userSaving.model";
import { ISaving } from "~auth/interfaces/userSaving.interface";
import { IErrorResponse } from '@quan0401/ecommerce-shared';
import { omit } from 'lodash';
import { Model, Op } from 'sequelize'; // Import ValidationError from Sequelize
import { IsUnion } from "joi";
import { integer } from "@elastic/elasticsearch/lib/api/types";

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
  async updateBalanceWithdraw(savingID: number, balance: number): Promise<boolean> {
    try {
      const userSaving = await UserSaving.findByPk(savingID);
  
      if (!userSaving) {
        throw new Error('Saving record not found');
      }
  
      const userSavingJSON = userSaving.toJSON() as ISaving;
      //use userId to find user and update the balance
  
      userSavingJSON.balance -= balance;
      if (userSavingJSON.balance == 0) {
        userSavingJSON.status = false;
      }
  
      await UserSaving.update({ balance: userSavingJSON.balance, status: userSavingJSON.status }, {
        where: { savingID }
      });
  
      return true;
    } catch (error) {
      console.error('Error updating balance:', error);
      return false;
    }
  }
  async updateBalanceDeposit(savingID: integer, balance: integer): Promise<boolean> {
    try {
      const userSaving = await UserSaving.findByPk(savingID);
  
      if (!userSaving) {
        throw new Error('Saving record not found');
      }
  
      const userSavingJSON = userSaving.toJSON() as ISaving;
  
      userSavingJSON.balance += balance;
  
      await UserSaving.update({ balance: userSavingJSON.balance }, {
        where: { savingID }
      });
  
      return true;
    } catch (error) {
      console.error('Error updating balance:', error);
      return false;
    }
  }
}



export const savingService: SavingService = new SavingService();