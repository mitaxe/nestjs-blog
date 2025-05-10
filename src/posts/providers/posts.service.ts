import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { TagsService } from 'src/tags/providers/tags.service';
import { GetPostsDto } from '../dtos/get-posts.dto';
import { Paginated } from 'src/common/interfaces/paginated.interface';
import { CreatePostProvider } from './create-post.provider';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { GetPostsProvider } from './get-posts.provider';
@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly usersService: UsersService,
    private readonly tagsService: TagsService,
    private readonly createPostProvider: CreatePostProvider,
    private readonly getPostsProvider: GetPostsProvider,
  ) {}

  public async findAll(postQuery: GetPostsDto): Promise<Paginated<Post>> {
    return this.getPostsProvider.getPosts(postQuery);
  }

  public async create(createPostDto: CreatePostDto, user: ActiveUserData) {
    this.createPostProvider.create(createPostDto, user);
  }

  public async update(updatePostDto: UpdatePostDto, user: ActiveUserData) {
    // Load post with relations in a single query
    const post = await this.postRepository
      .findOne({
        where: { id: updatePostDto.id },
        relations: {
          metaOptions: true,
          tags: true,
        },
      })
      .catch((error) => {
        throw new RequestTimeoutException('Unable to process the request', {
          cause: error,
          description: 'Database connection error',
        });
      });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    // Prepare updates in parallel if both tags and author need to be updated
    const updates = await Promise.all([
      updatePostDto.tags
        ? this.tagsService
            .findMultipleTags(updatePostDto.tags)
            .catch((error) => {
              throw new RequestTimeoutException(
                'Unable to process the request',
                {
                  cause: error,
                  description: 'Database connection error',
                },
              );
            })
        : null,

      user.sub
        ? this.usersService.findOneById(user.sub).catch((error) => {
            throw new RequestTimeoutException('Unable to process the request', {
              cause: error,
              description: 'Database connection error',
            });
          })
        : null,
    ]);

    // Apply updates
    const [tags, author] = updates;
    if (tags) post.tags = tags;
    if (author) post.author = author;

    // Update remaining fields
    Object.assign(post, updatePostDto);

    // Save the updated post
    return this.postRepository.save(post).catch((error) => {
      throw new RequestTimeoutException('Unable to process the request', {
        cause: error,
        description: 'Database connection error',
      });
    });
  }

  public async delete(id: number) {
    await this.postRepository.delete(id);
    return { deleted: true, id };
  }
}
