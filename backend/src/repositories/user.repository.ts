import {DefaultCrudRepository} from '@loopback/repository';
import {User, UserRelations} from '../models';
import {DevDbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  constructor(
    @inject('datasources.DevDb') dataSource: DevDbDataSource,
  ) {
    super(User, dataSource);
  }
}
