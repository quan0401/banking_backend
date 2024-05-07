import { omit } from 'lodash';
import { Model, Op } from 'sequelize'; // Import ValidationError from Sequelize
import { IAuthDocument } from '~auth/interfaces/auth.interface';
import { AuthModel } from '~auth/models/auth.model';

class AuthService {
  public async createNewUser(data: IAuthDocument): Promise<IAuthDocument> {
    const createdUser: Model<IAuthDocument> = (await AuthModel.create(data)) as Model<IAuthDocument>; // No need to cast to Model<IAuthDocument>

    const result: IAuthDocument = omit(createdUser.toJSON(), ['password']); // Use toJSON() to convert Sequelize model instance to plain JSON object
    return result;
  }

  public async findUserByEmailOrPhone(phone: string, email: string): Promise<IAuthDocument | undefined> {
    // const user: Model | null = await AuthModel.scope('withAdmin').findOne({
    const user: Model | null = await AuthModel.findOne({
      where: {
        [Op.or]: [{ email: email ? email : '' }, { phone: phone ? phone : '' }]
      }
    });
    return user?.dataValues;
  }

  public async findUserByEmailToken(token: string): Promise<IAuthDocument | undefined> {
    const user: Model | null = await AuthModel.findOne({
      where: {
        emailVerificationToken: token
      }
    });
    return user?.dataValues;
  }

  public async updateVerifyEmail(authId: Required<IAuthDocument>['id'], isVerified: 0 | 1): Promise<IAuthDocument | undefined> {
    const user: Model | null = await AuthModel.findOne({
      where: {
        id: authId
      }
    });
    if (user) {
      await user.update({ emailVerified: isVerified });
      await user.save();
    }
    return user?.dataValues;
  }

  public async isAdmin(authId: Required<IAuthDocument>['id']): Promise<boolean> {
    const user: Model | null = await AuthModel.scope('withAdmin').findOne({
      where: {
        id: authId
      }
    });
    return user?.dataValues.isAdmin === 1;
  }
}
export const authService: AuthService = new AuthService();
