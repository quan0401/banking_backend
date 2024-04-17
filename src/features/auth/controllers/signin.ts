import { BadRequestError } from '@quan0401/ecommerce-shared';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IAuthDocument } from '~auth/interfaces/auth.interface';
import { AuthModel } from '~auth/models/auth.model';
import { loginSchema } from '~auth/schemes/signin.scheme';
import { joiValidation } from '~global/decorators/joi-validation.decorator';
import { authService } from '~services/db/auth.service';

export class Signin {
  @joiValidation(loginSchema)
  public async user(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const user: IAuthDocument | null = (await authService.findUserByEmailOrPhone('', email)) as IAuthDocument | null;
    if (!user) throw new BadRequestError('User not exists', 'singin');
    const matched: boolean = await AuthModel.prototype.comparePassword(password, user.password!);

    res.status(StatusCodes.OK).json({ message: 'Welcomeback', user });
  }
}
