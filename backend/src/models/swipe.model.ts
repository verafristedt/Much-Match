import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Swipe extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  appWidth: number;

  @property({
    type: 'array',
    itemType: 'number',
    required: true,
  })
  rawTime: number[];

  @property({
    type: 'array',
    itemType: 'number',
    required: true,
  })
  rawX: number[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Swipe>) {
    super(data);
  }
}

export interface SwipeRelations {
  // describe navigational properties here
}

export type SwipeWithRelations = Swipe & SwipeRelations;
