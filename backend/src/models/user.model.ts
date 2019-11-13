import {Entity, model, property, hasMany} from '@loopback/repository';
import {Swipe} from './swipe.model';

@model({settings: {strict: false}})
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'boolean',
    required: true,
  })
  isMale: boolean;

  @property({
    type: 'number',
    required: true,
  })
  age: number;

  @property({
    type: 'boolean',
    required: true,
  })
  isWorking: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  isStudent: boolean;

  @hasMany(() => Swipe)
  swipes: Swipe[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
