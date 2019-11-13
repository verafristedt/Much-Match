import {DefaultCrudRepository} from '@loopback/repository';
import {Swipe, SwipeRelations} from '../models';
import {DevDbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SwipeRepository extends DefaultCrudRepository<
  Swipe,
  typeof Swipe.prototype.id,
  SwipeRelations
> {
  constructor(
    @inject('datasources.DevDb') dataSource: DevDbDataSource,
  ) {
    super(Swipe, dataSource);
  }
}
