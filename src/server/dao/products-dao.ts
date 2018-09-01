import * as _ from 'lodash';

import { Product } from '../../public/app/buy/model/product';
import { Products } from '../../public/app/buy/model/products';
import { Logger } from '../util/logger';

const log = Logger.create(module);

const naloxoneId: string = 'naloxone-1';
const narcanId: string = 'narcan-1';
const evzioId: string = 'evzio-1';
const featuredProductIds: string[] = [naloxoneId, narcanId];

 // tslint:disable max-line-length
const products: Products = new Products([
    {
      id: narcanId,
      title: 'Narcan (Naloxone)' ,
      price: 150.0,
      imageUri: '/assets/img/nasal-spray.png',
      detailShort:
          '- NARCAN® (naloxone HCl) Nasal Spray is the first and only FDA-approved nasal form of naloxone for the emergency treatment of a known or suspected opioid overdose.\n' +
          '- NARCAN® Nasal Spray counteracts the life-threatening effects of opioid overdose. Since most accidental overdoses occur in a home setting, it was developed for first responders, as well as family, friends, and caregivers.\n' +
          '- NARCAN® Nasal Spray is a prescription medicine used for the treatment of an opioid emergency such as an overdose or a possible opioid overdose with signs of breathing problems and severe sleepiness or not being able to respond.\n' +
          '- NARCAN® Nasal Spray is to be given right away and does not take the place of emergency medical care. Get emergency medical help right away after giving the first dose of NARCAN® Nasal Spray, even if the person wakes up.\n' +
          '- NARCAN® Nasal Spray is safe and effective in children for known or suspected opioid overdose.',
      details:
          '##### What is the most important information I should know about NARCAN® Nasal Spray?\n' +
          'NARCAN® Nasal Spray is used to temporarily reverse the effects of opioid medicines. The medicine in NARCAN® Nasal Spray has no effect in people who are not taking opioid medicines. Always carry NARCAN® Nasal Spray with you in case of an opioid emergency.\n' +
          '\n' +
          '1. Use NARCAN® Nasal Spray right away if you or your caregiver think signs or symptoms of an opioid emergency are present, even if you are not sure, because an opioid emergency can cause severe injury or death. Signs and symptoms of an opioid emergency may include:\n' +
          '  - unusual sleepiness and you are not able to awaken the person with a loud voice or by rubbing firmly on the middle of their chest (sternum)\n' +
          '  - breathing problems including slow or shallow breathing in someone difficult to awaken or who looks like they are not breathing\n' +
          '  - the black circle in the center of the colored part of the eye (pupil) is very small, sometimes called \'pinpoint pupils\' in someone difficult to awaken\n' +
          '2. Family members, caregivers, or other people who may have to use NARCAN® Nasal Spray in an opioid emergency should know where NARCAN® Nasal Spray is stored and how to give NARCAN® Nasal Spray before an opioid emergency happens.\n' +
          '3. __Get emergency medical help right away after giving the first dose of NARCAN® Nasal Spray.__ Rescue breathing or CPR (cardiopulmonary resuscitation) may be given while waiting for emergency medical help.\n' +
          '4. The signs and symptoms of an opioid emergency can return after NARCAN® Nasal Spray is given. If this happens, give another dose after 2 to 3 minutes using a new NARCAN® Nasal Spray and closely watch the person until emergency help is received.\n' +
          '\n' +
          '##### Who should not use NARCAN® Nasal Spray?\n' +
          '\n' +
          '__Do not use NARCAN® Nasal Spray__ if you are allergic to naloxone hydrochloride or any of the ingredients in NARCAN® Nasal Spray.\n' +
          '\n' +
          '##### What should I tell my healthcare provider before using NARCAN® Nasal Spray?\n' +
          '\n' +
          'Before using NARCAN® Nasal Spray, tell your healthcare provider about all of your medical conditions, including if you:\n' +
          '  - have heart problems\n' +
          '  - are pregnant or plan to become pregnant. Use of NARCAN® Nasal Spray may cause withdrawal symptoms in your unborn baby. Your unborn baby should be examined by a healthcare provider right away after you use NARCAN® Nasal Spray.\n' +
          '  - are breastfeeding or plan to breastfeed. It is not known if NARCAN® Nasal Spray passes into your breast milk.\n' +
          '\n' +
          '__Tell your healthcare provider about the medicines you take__, including prescription and over-the-counter medicines, vitamins, and herbal supplements.\n' +
          '\n' +
          '##### What are the possible side effects of NARCAN® Nasal Spray?\n' +
          '\n' +
          '__NARCAN® Nasal Spray may cause serious side effects, including:__\n' +
          '- Sudden opioid withdrawal symptoms. In someone who has been using opioids regularly, opioid withdrawal symptoms can happen suddenly after receiving NARCAN® Nasal Spray and may include:\n' +
          '  - body aches\n' +
          '  - diarrhea\n' +
          '  - increased heart rate\n' +
          '  - fever\n' +
          '  - runny nose\n' +
          '  - sneezing\n' +
          '  - goose bumps\n' +
          '  - sweating\n' +
          '  - yawning\n' +
          '  - nausea or vomiting\n' +
          '  - nervousness\n' +
          '  - restlessness or irritability\n' +
          '  - shivering or trembling\n' +
          '  - stomach cramping\n' +
          '  - weakness\n' +
          '  - increased blood pressure\n' +
          '\n' +
          'In infants under 4-weeks old who have been receiving opioids regularly, sudden opioid withdrawal may be life-threatening if not treated the right way. Signs and symptoms include: seizures, crying more than usual, and increased reflexes.\n' +
          'These are not all of the possible side effects of NARCAN® Nasal Spray. Call your doctor for medical advice about side effects. You may report side effects to the FDA at 1-800-FDA-1088 or [www.fda.gov/medwatch]().',
      usage:
          '| Administering NARCAN® nasal spray | Description |\n' +
          '| ---- | ---- |\n' +
          '|![usage-instruction](https://www.narcan.com/images/step-peel.png)|Peel back the package to remove the device. Hold the device with your thumb on the bottom of the plunger and 2 fingers on the nozzle.|\n' +
          '|![usage-instruction](https://www.narcan.com/images/step-place.png)|Place and hold the tip of the nozzle in either nostril until your fingers touch the bottom of the patient’s nose.|\n' +
          '|![usage-instruction](https://www.narcan.com/images/step-press.png)|Press the plunger firmly to release the dose into the patient’s nose.|\n\n' +
          '---------------\n\n' +
          'Not a Substitute for Emergency Medical Care. When administering NARCAN® Nasal Spray, always be sure to call 911 right away, even if the person wakes up. Keep the patient under surveillance or close watch. If breathing does not return to normal or if breathing difficulty resumes, after 2-3 minutes, give an additional dose of NARCAN® Nasal Spray using a new device in the alternate nostril.'
    },
    {
      id: naloxoneId,
      title: 'Naloxone HCl' ,
      price: 100.0,
      imageUri: '/assets/img/naloxone-nasal.png',
      detailShort: '',
      details: '',
      usage: '',
    },
    {
      id: evzioId,
      title: 'Evzio' ,
      price: 125.0,
      imageUri: '/assets/img/evzio.png',
      detailShort: '',
      details: '',
      usage: '',
    }
  ]);
// tslint:enable max-line-length

const indexedProducts: {[id: string]: Product} = _.keyBy(products.items, 'id');

export class ProductDao {
  public static TEST_STATE = 'TexasTest';

  private constructor() {}

  /**
   * Creates singleton instance of a ProductDao.
   */
  public static create = _.once((): ProductDao => {
    return new ProductDao();
  });

  public getFeaturedProducts(): Promise<Products> {
    return Promise.resolve(
        new Products(featuredProductIds.map((id): Product => indexedProducts[id]))
    );
  }

  public getStateProducts(state: string): Promise<Products> {
    if (state === ProductDao.TEST_STATE) {
      return this.getFeaturedProducts();
    }
    // for now just return empty
    return Promise.resolve( new Products() );
  }
}
