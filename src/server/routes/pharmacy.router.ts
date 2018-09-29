import * as express from 'express';
import { NextFunction, Request, Response, Router } from 'express';
import * as _ from 'lodash';

const router: Router = express.Router();

// tslint:disable max-line-length
const pharmacies = {
  pharmacies: [
    {
      id: 1,
      image: '/assets/img/GoodcarePharmacy.png',
      name: 'Good Care Pharmacy',
      address: 'Houston, Texas',
      description: `Good Care Pharmacy's mission is to provide the best pharmaceutical care and service to all patients. To treat patients with respect, dignity, compassion and empathy regardless of their social background, race, or creed.`,
      hours: [
        `Monday - Friday: 9:00am - 5:00pm`,
        `Saturday - Sunday: Closed`
      ],
      email: 'thegoodcarepharmacy@gmail.com',
      phone: '1-832-530-4767',
      homepage: 'https://www.thegoodcarepharmacy.com/contact-us'
    }
  ]
};
// tslint:enable max-line-length

/**
 * @api GET /api/pharmacy/list/
 */
router.get('/list', (req: Request, res: Response) => {
  res.json(pharmacies);
});

export const PharmacyRouter: Router = router;
