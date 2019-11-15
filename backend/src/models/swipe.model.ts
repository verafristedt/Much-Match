import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Image} from './image.model';
import {User} from './user.model';

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
    type: 'number',
    required: true,
  })
  appHeight: number;

  @property({
    type: 'number',
    required: true,
  })
  duration: number;

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
  rawTimestamps: number[];

  @property({
    type: 'array',
    itemType: 'number',
    required: true,
  })
  rawSpeed: number[];

  @property({
    type: 'array',
    itemType: 'number',
    required: true,
  })
  rawX: number[];

  @property({
    type: 'array',
    itemType: 'number',
    required: true,
  })
  rawSpeedX: number[];

  @property({
    type: 'array',
    itemType: 'number',
    required: true,
  })
  rawY: number[];

  @property({
    type: 'array',
    itemType: 'number',
    required: true,
  })
  rawSpeedY: number[];

  @property({
    type: 'boolean',
    required: true,
  })
  liked: boolean;

  @belongsTo(() => Image)
  imageId: string;

  @belongsTo(() => User)
  userId: string;
  // Define well-known properties here

  constructor(data?: Partial<Swipe>) {
    super(data);
  }

  get averageSpeed() {
    // Computes the total distance the finger travels and divides
    // it by the total time from first touch to release
    let distanceTravelled = 0;
    let rawXLength = this.rawX.length;
    for (let i = 1; i < rawXLength; i++) {
      distanceTravelled += Math.abs(this.rawX[i] - this.rawX[i - 1]);
    }
    let swipeTime = this.rawTime[this.rawTime.length - 1] - this.rawTime[0];

    let averageSpeed = distanceTravelled / swipeTime;
    return averageSpeed;
  }
}

export interface SwipeRelations {
  // describe navigational properties here
}

export type SwipeWithRelations = Swipe & SwipeRelations;
