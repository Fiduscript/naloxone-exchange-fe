import * as _ from 'lodash';

import { Product } from '../../public/app/buy/model/product';
import { Products } from '../../public/app/buy/model/products';
import { Logger } from '../util/logger';

const log = Logger.create(module);

const naloxoneId: string = 'naloxone-1';
const narcanId: string = 'narcan-1';
const evzioId: string = 'evzio-1';
const featuredProductIds: string[] = [narcanId, evzioId, naloxoneId];

 // tslint:disable max-line-length
const products: Products = new Products([
    {
      id: narcanId,
      administrationMethod: 'Nasal Spray',
      dosage: '2 × 4mg / 0.1 mL',
      fdaUri: 'https://www.fda.gov/Drugs/DrugSafety/ucm472958.htm',
      imageUri: '/assets/img/nasal-spray.png',
      notes: '',
      price: 150.0,
      title: 'Narcan' ,
    },
    {
      id: naloxoneId,
      administrationMethod: 'Nasal Spray',
      dosage: '2 × 2 mg / mL',
      fdaUri: 'https://www.fda.gov/Drugs/DrugSafety/ucm472958.htm',
      imageUri: '/assets/img/Naloxone-HCl.png',
      notes: '(2) Nasal Atomizers (INCLUDED)',
      price: 100.0,
      title: 'Naloxone HCl' ,
    },
    {
      id: evzioId,
      administrationMethod: 'Auto Injector',
      dosage: '2 × 0.4mg / 0.4mL',
      fdaUri: 'https://www.fda.gov/Drugs/DrugSafety/PostmarketDrugSafetyInformationforPatientsandProviders/ucm391449.htm',
      imageUri: '/assets/img/evzio.png',
      notes: '',
      price: 125.0,
      title: 'Evzio'
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
