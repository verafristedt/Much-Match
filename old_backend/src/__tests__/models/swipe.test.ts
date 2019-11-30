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
      swipe.rawX = [1, 2, 1, 3];
      swipe.rawTime = [0, 20, 30, 40];
	  console.log("Calculated average speed is");
	  console.log(swipe.averageSpeed);
      expect(swipe.averageSpeed).to.equal(0.1);
    });


    // it('should return negative speed if on the left', async () => {});
  });

  //describe('hesitation coefficient', () => {});
});
