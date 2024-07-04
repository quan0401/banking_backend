"use strict";
// import { BadRequestError, uploads } from '@quan0401/ecommerce-shared';
// import { UploadApiResponse } from 'cloudinary';
// import { Request, Response } from 'express';
// import { StatusCodes } from 'http-status-codes';
// import { config } from '../../../config';
// import { joiValidation } from '../../../shared/globals/decorators/joi-validation.decorator';
// import { ISavingPlanDocument } from '../../savingPlan/interfaces/savingPlan.interface';
// import { savingPlanScheme } from '../../savingPlan/schemes/savingPlan.cheme';
// import { savingPlanService } from '../../../shared/services/db/savingPlan.service';
// import { IUserSavingDocument } from '../interfaces/userSaving.interface';
// export class CreateUserSaving {
//   @joiValidation(savingPlanScheme)
//   public async create(req: Request, res: Response): Promise<void> {
//     const { savingPlanId } = req.params;
//     const { currency, targetAmount } = req.body;
//     const userSavingDoc: IUserSavingDocument = {
//       userId: req.currentUser!.id,
//       savingPlanId: savingPlanId as string,
//       lastUpdated: new Date(),
//       currency,
//       targetAmount
//     };
//     res.status(StatusCodes.CREATED).json({ message: 'Created Saving Plan successfully' });
//   }
// }
//# sourceMappingURL=createUserSaving.js.map