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
  del,
  requestBody,
} from '@loopback/rest';
import {Image} from '../models';
import {ImageRepository} from '../repositories';

export class ImageController {
  constructor(
    @repository(ImageRepository)
    public imageRepository: ImageRepository,
  ) {}

  @post('/images', {
    responses: {
      '200': {
        description: 'Image model instance',
        content: {'application/json': {schema: getModelSchemaRef(Image)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Image, {
            title: 'NewImage',
            exclude: ['id'],
          }),
        },
      },
    })
    image: Omit<Image, 'id'>,
  ): Promise<Image> {
    return this.imageRepository.create(image);
  }

  @get('/images/count', {
    responses: {
      '200': {
        description: 'Image model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Image)) where?: Where<Image>,
  ): Promise<Count> {
    return this.imageRepository.count(where);
  }

  @get('/images', {
    responses: {
      '200': {
        description: 'Array of Image model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Image)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Image))
    filter?: Filter<Image>,
  ): Promise<Image[]> {
    return this.imageRepository.find(filter);
  }

  @patch('/images', {
    responses: {
      '200': {
        description: 'Image PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Image, {partial: true}),
        },
      },
    })
    image: Image,
    @param.query.object('where', getWhereSchemaFor(Image)) where?: Where<Image>,
  ): Promise<Count> {
    return this.imageRepository.updateAll(image, where);
  }

  @get('/images/{id}', {
    responses: {
      '200': {
        description: 'Image model instance',
        content: {'application/json': {schema: getModelSchemaRef(Image)}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Image> {
    return this.imageRepository.findById(id);
  }

  @patch('/images/{id}', {
    responses: {
      '204': {
        description: 'Image PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Image, {partial: true}),
        },
      },
    })
    image: Image,
  ): Promise<void> {
    await this.imageRepository.updateById(id, image);
  }

  @put('/images/{id}', {
    responses: {
      '204': {
        description: 'Image PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() image: Image,
  ): Promise<void> {
    await this.imageRepository.replaceById(id, image);
  }

  // @del('/images/{id}', {
  //   responses: {
  //     '204': {
  //       description: 'Image DELETE success',
  //     },
  //   },
  // })
  // async deleteById(@param.path.string('id') id: string): Promise<void> {
  //   await this.imageRepository.deleteById(id);
  // }
}
