import { UserSaving } from "~auth/models/userSaving.model";
import { ISaving } from "~auth/interfaces/userSaving.interface";
import { IErrorResponse } from '@quan0401/ecommerce-shared';
import { omit } from 'lodash';
import { Model, Op } from 'sequelize'; // Import ValidationError from Sequelize

class SavingService {
  async openSaving(data: ISaving): Promise<ISaving | IErrorResponse> {
    try {
      const saving = await UserSaving.create({
        ...data,
        createdAt: new Date(),
      });

      return saving.toJSON();
    } catch (error: any) {
      // Handle errors and return an error response
      return {
        message: error?.errors[0]?.message,
        statusCode: -1,
        status: 'error',
        comingFrom: 'SavingService openSaving'
      } as IErrorResponse;
    }
  }
}

export const savingService: SavingService = new SavingService();
