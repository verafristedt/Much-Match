import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Image, ImageRelations, Swipe} from '../models';
import {DevDbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {SwipeRepository} from './swipe.repository';

export class ImageRepository extends DefaultCrudRepository<
  Image,
  typeof Image.prototype.id,
  ImageRelations
> {

  public readonly swipes: HasManyRepositoryFactory<Swipe, typeof Image.prototype.id>;

  constructor(
    @inject('datasources.DevDb') dataSource: DevDbDataSource, @repository.getter('SwipeRepository') protected swipeRepositoryGetter: Getter<SwipeRepository>,
  ) {
    super(Image, dataSource);
    this.swipes = this.createHasManyRepositoryFactoryFor('swipes', swipeRepositoryGetter,);
    this.registerInclusionResolver('swipes', this.swipes.inclusionResolver);
  }
}
