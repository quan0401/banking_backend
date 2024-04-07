import { BadRequestError, consoleLogger, IErrorResponse } from '@quan0401/ecommerce-shared';
import { omit } from 'lodash';
import { Model, ValidationError } from 'sequelize'; // Import ValidationError from Sequelize
import { Logger } from 'winston';
import { IAuthDocument } from '~auth/interfaces/auth.interface';
import { AuthModel } from '~auth/models/auth.model';

const log: Logger = consoleLogger('AuthService', 'debug');
class AuthService {
  public async createNewUser(data: IAuthDocument): Promise<IAuthDocument | IErrorResponse> {
    try {
      const createdUser: Model<IAuthDocument> = (await AuthModel.create(data)) as Model<IAuthDocument>; // No need to cast to Model<IAuthDocument>

      const result: IAuthDocument = omit(createdUser.toJSON(), ['password']); // Use toJSON() to convert Sequelize model instance to plain JSON object
      return result;
    } catch (error: any) {
      return {
        message: error?.errors[0]?.message,
        statusCode: -1,
        status: 'status',
        comingFrom: 'AuthService createNewUser'
      } as IErrorResponse;
    }
  }
}
export const authService: AuthService = new AuthService();
