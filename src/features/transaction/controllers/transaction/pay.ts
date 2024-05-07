import { BadRequestError, uploads } from '@quan0401/ecommerce-shared';
import { UploadApiResponse } from 'cloudinary';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { config } from '~/config';
import { joiValidation } from '~global/decorators/joi-validation.decorator';
import { ISavingPlanDocument } from '~savingPlan/interfaces/savingPlan.interface';
import { savingPlanScheme } from '~savingPlan/schemes/savingPlan.cheme';
import { savingPlanService } from '~services/db/savingPlan.service';

export class Pay {
  @joiValidation(savingPlanScheme)
  public async pay(req: Request, res: Response): Promise<void> {}
}
