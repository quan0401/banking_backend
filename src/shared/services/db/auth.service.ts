import { IErrorResponse } from '@quan0401/ecommerce-shared';
import { omit } from 'lodash';
import { Model, Op } from 'sequelize'; // Import ValidationError from Sequelize
import { IAuthDocument } from '~auth/interfaces/auth.interface';
import { AuthModel } from '~auth/models/auth.model';

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
  public async findUserByEmailOrPhone(phone: string, email: string): Promise<IAuthDocument | null | IErrorResponse> {
    try {
      const user: Model | null = await AuthModel.findOne({
        where: {
          [Op.or]: [{ email: email ? email : '' }, { phone: phone ? phone : '' }]
        }
      });
      return user ? user.toJSON() : null;
    } catch (error: any) {
      return {
        message: error?.errors[0]?.message,
        statusCode: -1,
        status: 'status',
        comingFrom: 'AuthService createNewUser'
      } as IErrorResponse;
    }
  }
  // public async findUserByEmail(email: string): Promise<IAuthDocument | IErrorResponse> {
  //   try {
  //     const auth = await AuthModel.findOne({
  //       where: { email }
  //     });

  //   } catch (error: any) {
  //     return {
  //       message: error?.errors[0]?.message,
  //       statusCode: -1,
  //       status: 'status',
  //       comingFrom: 'AuthService createNewUser'
  //     } as IErrorResponse;
  //   }
  // }


}
export const authService: AuthService = new AuthService();
