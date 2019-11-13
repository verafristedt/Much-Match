import {
  DefaultCrudRepository,
  repository,
  HasManyRepositoryFactory,
} from '@loopback/repository';
import {User, UserRelations, Swipe} from '../models';
import {DevDbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {SwipeRepository} from './swipe.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  public readonly swipes: HasManyRepositoryFactory<
    Swipe,
    typeof User.prototype.id
  >;

  constructor(
    @inject('datasources.DevDb') dataSource: DevDbDataSource,
    @repository.getter('SwipeRepository')
    protected swipeRepositoryGetter: Getter<SwipeRepository>,
  ) {
    super(User, dataSource);
    this.swipes = this.createHasManyRepositoryFactoryFor(
      'swipes',
      swipeRepositoryGetter,
    );
    this.registerInclusionResolver('swipes', this.swipes.inclusionResolver);
  }
}
