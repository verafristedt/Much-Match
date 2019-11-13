import {expect} from '@loopback/testlab';
import {Swipe} from '../../models';

describe('Swipe Model', () => {
  it('should return speed 0 if raw data is missing', async () => {
    const swipe: Swipe = new Swipe();
    expect(swipe.averageSpeed).to.equal(0);
  });
});
