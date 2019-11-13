import {expect} from '@loopback/testlab';
import {Swipe} from '../../models';

describe('Swipe Model', () => {
  describe('average speed', () => {
    it('should return 0 if raw data is missing', async () => {
      const swipe: Swipe = new Swipe();
      expect(swipe.averageSpeed).to.equal(0);
    });

    it('should return the right speed with valid raw data ', async () => {
      const swipe: Swipe = new Swipe();
      swipe.rawTime = [1, 2];
      swipe.rawTime = [10, 20];
      expect(swipe.averageSpeed).to.equal(10);
    });

    it('should return 0 if raw data is one value', async () => {
      const swipe: Swipe = new Swipe();
      swipe.rawTime = [1];
      swipe.rawTime = [10];
      expect(swipe.averageSpeed).to.equal(0);
    });

    // it('should return negative speed if on the left', async () => {});
  });

  //describe('hesitation coefficient', () => {});
});
