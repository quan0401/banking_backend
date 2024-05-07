import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IAuthDocument, ISignUpPayload } from '~auth/interfaces/auth.interface';
import { authService } from '~services/db/auth.service';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import { joiValidation } from '~global/decorators/joi-validation.decorator';
import { signupScheme } from '~auth/schemes/signup.scheme';
import { BadRequestError, IErrorResponse, uploads } from '@quan0401/ecommerce-shared';
import { config } from '~/config';
import { UploadApiResponse } from 'cloudinary';

export class Signup {
  @joiValidation(signupScheme)
  public async signup(req: Request, res: Response): Promise<void> {
    const { username, password, email, phone, cccd, homeAddress, profilePicture } = req.body as ISignUpPayload;
    const isExisted = await authService.findUserByEmailOrPhone('', email);
    if (isExisted) throw new BadRequestError('User already exists', 'Signup');

    const profilePublicId: string = uuidv4();
    const randomBytes: Buffer = crypto.randomBytes(20);
    const randomCharacters: string = randomBytes.toString('hex');

    // upload image to cloudinary
    const response: UploadApiResponse = (await uploads(profilePicture, config.CLOUD_FOLDER!)) as UploadApiResponse;
    if (!response?.public_id) throw new BadRequestError('File upload error, please try again!', 'Signup cloudinary uploads');
    const profilePictureUrl = response.url;
    const userData: IAuthDocument = {
      profilePublicId,
      username,
      email,
      phone,
      password,
      cccd,
      homeAddress,
      profilePicture: profilePictureUrl,
      emailVerificationToken: randomCharacters
    } as IAuthDocument;

    // upload to database
    const result: IAuthDocument = await authService.createNewUser(userData);

    res.status(StatusCodes.CREATED).json({ message: 'Create user successfully', user: result });
  }
}
