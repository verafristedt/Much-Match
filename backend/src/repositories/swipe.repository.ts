import {
  DefaultCrudRepository,
  repository,
  BelongsToAccessor,
} from '@loopback/repository';
import {Swipe, SwipeRelations, Image, User} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ImageRepository} from './image.repository';
import {UserRepository} from './user.repository';

export class SwipeRepository extends DefaultCrudRepository<
  Swipe,
  typeof Swipe.prototype.id,
  SwipeRelations
> {
  public readonly image: BelongsToAccessor<Image, typeof Swipe.prototype.id>;

  public readonly user: BelongsToAccessor<User, typeof Swipe.prototype.id>;

  constructor(
    @inject('datasources.Db') dataSource: DbDataSource,
    @repository.getter('ImageRepository')
    protected imageRepositoryGetter: Getter<ImageRepository>,
    @repository.getter('UserRepository')
    protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Swipe, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
    this.image = this.createBelongsToAccessorFor(
      'image',
      imageRepositoryGetter,
    );
    this.registerInclusionResolver('image', this.image.inclusionResolver);
  }
}
