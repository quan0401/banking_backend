import { consoleLogger } from '@quan0401/ecommerce-shared';
import { omit } from 'lodash';
import { Model, BaseError, ValidationError } from 'sequelize';
import { Logger } from 'winston';
import { IAuthDocument } from '~auth/interfaces/auth.interface';
import { AuthModel } from '~auth/models/auth.model';

const log: Logger = consoleLogger('AuthService', 'debug');
class AuthService {
  public async createNewUser(data: IAuthDocument): Promise<IAuthDocument | undefined> {
    try {
      const createdUser: Model<IAuthDocument> = (await AuthModel.create(data)) as Model<IAuthDocument>;

      const result: IAuthDocument = omit(createdUser.dataValues, ['password']);
      return result;
    } catch (error: any) {
      log.error(error?.errors[0]?.message);
    }
  }
}
export const authService: AuthService = new AuthService();
