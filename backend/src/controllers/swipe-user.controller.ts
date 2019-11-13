import {repository} from '@loopback/repository';
import {param, get, getModelSchemaRef} from '@loopback/rest';
import {Swipe, User} from '../models';
import {SwipeRepository} from '../repositories';

export class SwipeUserController {
  constructor(
    @repository(SwipeRepository)
    public swipeRepository: SwipeRepository,
  ) {}

  @get('/swipes/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Swipe',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.string('id') id: typeof Swipe.prototype.id,
  ): Promise<User> {
    return this.swipeRepository.user(id);
  }
}
