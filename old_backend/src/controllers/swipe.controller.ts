import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  requestBody,
} from '@loopback/rest';
import {Swipe} from '../models';
import {SwipeRepository} from '../repositories';

export class SwipeController {
  constructor(
    @repository(SwipeRepository)
    public swipeRepository: SwipeRepository,
  ) {}

  @post('/swipes', {
    responses: {
      '200': {
        description: 'Swipe model instance',
        content: {'application/json': {schema: getModelSchemaRef(Swipe)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Swipe, {
            title: 'NewSwipe',
            exclude: ['id'],
          }),
        },
      },
    })
    swipe: Omit<Swipe, 'id'>,
    @param.header.string('User-Agent') userAgent: string,
  ): Promise<Swipe> {
    swipe.userAgent = userAgent;
    return this.swipeRepository.create(swipe);
  }

  @get('/swipes/count', {
    responses: {
      '200': {
        description: 'Swipe model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Swipe)) where?: Where<Swipe>,
  ): Promise<Count> {
    return this.swipeRepository.count(where);
  }

  @get('/swipes', {
    responses: {
      '200': {
        description: 'Array of Swipe model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Swipe)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Swipe))
    filter?: Filter<Swipe>,
  ): Promise<Swipe[]> {
    return this.swipeRepository.find(filter);
  }

  @patch('/swipes', {
    responses: {
      '200': {
        description: 'Swipe PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Swipe, {partial: true}),
        },
      },
    })
    swipe: Swipe,
    @param.query.object('where', getWhereSchemaFor(Swipe)) where?: Where<Swipe>,
  ): Promise<Count> {
    return this.swipeRepository.updateAll(swipe, where);
  }

  @get('/swipes/{id}', {
    responses: {
      '200': {
        description: 'Swipe model instance',
        content: {'application/json': {schema: getModelSchemaRef(Swipe)}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Swipe> {
    return this.swipeRepository.findById(id);
  }

  @patch('/swipes/{id}', {
    responses: {
      '204': {
        description: 'Swipe PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Swipe, {partial: true}),
        },
      },
    })
    swipe: Swipe,
  ): Promise<void> {
    await this.swipeRepository.updateById(id, swipe);
  }

  @put('/swipes/{id}', {
    responses: {
      '204': {
        description: 'Swipe PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() swipe: Swipe,
  ): Promise<void> {
    await this.swipeRepository.replaceById(id, swipe);
  }

  // @del('/swipes/{id}', {
  //   responses: {
  //     '204': {
  //       description: 'Swipe DELETE success',
  //     },
  //   },
  // })
  // async deleteById(@param.path.string('id') id: string): Promise<void> {
  //   await this.swipeRepository.deleteById(id);
  // }
}
