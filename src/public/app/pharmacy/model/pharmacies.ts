import { Pharmacy } from './pharmacy';

export class Pharmacies {

  public readonly pharmacies: Pharmacy[] = [];

  public constructor(pharmacies: Pharmacy[] = []) {
    this.pharmacies = pharmacies;
  }

}
