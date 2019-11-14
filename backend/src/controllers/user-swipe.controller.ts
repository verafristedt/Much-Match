import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {User, Swipe} from '../models';
import {UserRepository} from '../repositories';

export class UserSwipeController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) {}

  @get('/users/{id}/swipes', {
    responses: {
      '200': {
        description: "Array of Swipe's belonging to User",
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Swipe)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Swipe>,
  ): Promise<Swipe[]> {
    return this.userRepository.swipes(id).find(filter);
  }

  @post('/users/{id}/swipes', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Swipe)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Swipe, {
            title: 'NewSwipeInUser',
            exclude: ['id'],
            optional: ['userId'],
          }),
        },
      },
    })
    swipe: Omit<Swipe, 'id'>,
  ): Promise<Swipe> {
    return this.userRepository.swipes(id).create(swipe);
  }

  @patch('/users/{id}/swipes', {
    responses: {
      '200': {
        description: 'User.Swipe PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Swipe, {partial: true}),
        },
      },
    })
    swipe: Partial<Swipe>,
    @param.query.object('where', getWhereSchemaFor(Swipe)) where?: Where<Swipe>,
  ): Promise<Count> {
    return this.userRepository.swipes(id).patch(swipe, where);
  }

  // @del('/users/{id}/swipes', {
  //   responses: {
  //     '200': {
  //       description: 'User.Swipe DELETE success count',
  //       content: {'application/json': {schema: CountSchema}},
  //     },
  //   },
  // })
  // async delete(
  //   @param.path.string('id') id: string,
  //   @param.query.object('where', getWhereSchemaFor(Swipe)) where?: Where<Swipe>,
  // ): Promise<Count> {
  //   return this.userRepository.swipes(id).delete(where);
  // }
}
