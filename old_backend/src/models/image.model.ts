import {Entity, model, property, hasMany} from '@loopback/repository';
import {Swipe} from './swipe.model';

@model({settings: {strict: false}})
export class Image extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  src: string;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  category?: string;

  @hasMany(() => Swipe)
  swipes: Swipe[];
  // Define well-known properties here

  constructor(data?: Partial<Image>) {
    super(data);
  }
}

export interface ImageRelations {
  // describe navigational properties here
}

export type ImageWithRelations = Image & ImageRelations;
