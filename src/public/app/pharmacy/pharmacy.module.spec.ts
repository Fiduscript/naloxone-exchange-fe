import { PharmacyModule } from './pharmacy.module';

describe('PharmacyModule', () => {
  let pharmacyModule: PharmacyModule;

  beforeEach(() => {
    pharmacyModule = new PharmacyModule();
  });

  it('should create an instance', () => {
    expect(pharmacyModule).toBeTruthy();
  });
});
