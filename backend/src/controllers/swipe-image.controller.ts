import {repository} from '@loopback/repository';
import {param, get, getModelSchemaRef} from '@loopback/rest';
import {Swipe, Image} from '../models';
import {SwipeRepository} from '../repositories';

export class SwipeImageController {
  constructor(
    @repository(SwipeRepository)
    public swipeRepository: SwipeRepository,
  ) {}

  @get('/swipes/{id}/image', {
    responses: {
      '200': {
        description: 'Image belonging to Swipe',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Image)},
          },
        },
      },
    },
  })
  async getImage(
    @param.path.string('id') id: typeof Swipe.prototype.id,
  ): Promise<Image> {
    return this.swipeRepository.image(id);
  }
}
