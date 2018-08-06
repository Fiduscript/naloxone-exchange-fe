import { AboutUsModule } from './about-us.module';

describe('AboutUsModule', () => {
  let aboutUsModule: AboutUsModule;

  beforeEach(() => {
    aboutUsModule = new AboutUsModule();
  });

  it('should create an instance', () => {
    expect(aboutUsModule).toBeTruthy();
  });
});
