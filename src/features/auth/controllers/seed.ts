import { faker } from '@faker-js/faker';
import { BadRequestError, firstLetterUppercase, IErrorResponse } from '@quan0401/ecommerce-shared';
import { authService } from '~services/db/auth.service';
import { generateFromEmail } from 'unique-username-generator';
import { Request, Response } from 'express';
import { IAuthDocument } from '~auth/interfaces/auth.interface';
import crypto from 'crypto';
import { v4 as uuidV4 } from 'uuid';
import { lowerCase, sample } from 'lodash';
import { StatusCodes } from 'http-status-codes';
import { AuthModel } from '~auth/models/auth.model';
import { savingService } from '~services/db/saving.service';
import { ISaving } from '~auth/interfaces/userSaving.interface';

export class Seed {
  public async seedsAuth(req: Request, res: Response): Promise<void> {
    for (let i = 0; i < parseInt(req.params.count); i++) {
      const randomEmail = faker.internet.email();
      // add three random digits
      const username = generateFromEmail(randomEmail, 0);
      const password = 'quan0401';
      const country = faker.location.country();
      const phone = faker.phone.number();
      const profilePicture = faker.image.avatar();
      const checkIfUserExist: IAuthDocument | undefined = await authService.getAuthUserWithEmail(randomEmail);
      if (checkIfUserExist) throw new BadRequestError('Invalid credentials. Email or Username', 'Signup create() method');
      const profilePublicId = uuidV4();
      const randomBytes: Buffer = await Promise.resolve(crypto.randomBytes(20));
      const randomCharacters: string = randomBytes.toString('hex');
      const authData: IAuthDocument = {
        username: firstLetterUppercase(username),
        email: lowerCase(randomEmail),
        profilePublicId,
        password,
        phone,
        country,
        profilePicture,
        emailVerificationToken: randomCharacters,
        emailVerified: sample([0, 1])
      } as IAuthDocument;
      const result: IAuthDocument = (await authService.createNewUser(authData)) as IAuthDocument;
      console.log({ result });
    }
    res.status(StatusCodes.OK).json({ message: 'Seed users created successfully.' });
  }

  public async seedsSaving(req: Request, res: Response): Promise<void> {
    const users = await AuthModel.findAll();

    for (const user of users) {
      const savingsRecord = Math.floor(Math.random() * 5) + 1;

      for (let i = 0; i < savingsRecord; i++) {
        const savingData: ISaving = {
          userId: user.dataValues.id,
          savingPlanId: sample(['KH0', 'KH3', 'KH6']), // randomly select a savingPlanId
          balance: Math.random() * 1e7 + 1e6 // generate a random balance greater than 1e6
        };

        const saving: ISaving = (await savingService.openSaving(savingData)) as ISaving;

        console.log({saving});
      }
    }
    res.status(StatusCodes.OK).json({ message: 'Seed savings created successfully.' });
  }
}
