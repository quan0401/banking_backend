import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IAuthDocument, ISignUpPayload } from '~auth/interfaces/auth.interface';
import { authService } from '~services/db/auth.service';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

export class Signup {
  public async signup(req: Request, res: Response): Promise<void> {
    const { username, password, email, phone, country, profilePicture } = req.body as ISignUpPayload;
    const profilePublicId: string = uuidv4();
    const randomBytes: Buffer = crypto.randomBytes(20);
    const randomCharacters: string = randomBytes.toString('hex');
    const userData: IAuthDocument = {
      profilePublicId,
      username,
      email,
      phone,
      password,
      country,
      profilePicture,
      emailVerificationToken: randomCharacters
    } as IAuthDocument;

    // upload image to cloudinary

    const result: IAuthDocument = (await authService.createNewUser(userData)) as IAuthDocument;
    res.status(StatusCodes.CREATED).json({ message: 'Create user successfully', user: result });
  }
}
