import { BuyModule } from './buy.module';

describe('BuyModule', () => {
  let buyModule: BuyModule;

  beforeEach(() => {
    buyModule = new BuyModule();
  });

  it('should create an instance', () => {
    expect(buyModule).toBeTruthy();
  });
});
