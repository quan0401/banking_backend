import { BadRequestError } from '@quan0401/ecommerce-shared';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IAuthDocument } from '~auth/interfaces/auth.interface';
import { AuthModel } from '~auth/models/auth.model';
import { loginSchema } from '~auth/schemes/signin.scheme';
import { joiValidation } from '~global/decorators/joi-validation.decorator';
import { authService } from '~services/db/auth.service';

export class Admin {
  @joiValidation(loginSchema)
  public async requestToBecomeAdmin(req: Request, res: Response): Promise<void> {}
}
