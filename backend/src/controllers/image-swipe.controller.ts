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
import {
  Image,
  Swipe,
} from '../models';
import {ImageRepository} from '../repositories';

export class ImageSwipeController {
  constructor(
    @repository(ImageRepository) protected imageRepository: ImageRepository,
  ) { }

  @get('/images/{id}/swipes', {
    responses: {
      '200': {
        description: 'Array of Swipe\'s belonging to Image',
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
    return this.imageRepository.swipes(id).find(filter);
  }

  @post('/images/{id}/swipes', {
    responses: {
      '200': {
        description: 'Image model instance',
        content: {'application/json': {schema: getModelSchemaRef(Swipe)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Image.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Swipe, {
            title: 'NewSwipeInImage',
            exclude: ['id'],
            optional: ['imageId']
          }),
        },
      },
    }) swipe: Omit<Swipe, 'id'>,
  ): Promise<Swipe> {
    return this.imageRepository.swipes(id).create(swipe);
  }

  @patch('/images/{id}/swipes', {
    responses: {
      '200': {
        description: 'Image.Swipe PATCH success count',
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
    return this.imageRepository.swipes(id).patch(swipe, where);
  }

  @del('/images/{id}/swipes', {
    responses: {
      '200': {
        description: 'Image.Swipe DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Swipe)) where?: Where<Swipe>,
  ): Promise<Count> {
    return this.imageRepository.swipes(id).delete(where);
  }
}
