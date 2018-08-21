import { UpdateSubscriberModule } from './update-subscriber.module';

describe('UpdateSubscriberModule', () => {
  let updateSubscriberModule: UpdateSubscriberModule;

  beforeEach(() => {
    updateSubscriberModule = new UpdateSubscriberModule();
  });

  it('should create an instance', () => {
    expect(updateSubscriberModule).toBeTruthy();
  });
});
