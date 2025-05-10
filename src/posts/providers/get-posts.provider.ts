import { Injectable } from '@nestjs/common';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { GetPostsDto } from '../dtos/get-posts.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';

@Injectable()
export class GetPostsProvider {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly paginationProvider: PaginationProvider,
  ) {}

  public async getPosts(postQuery: GetPostsDto) {
    const posts = await this.paginationProvider.paginateQuery(
      postQuery,
      this.postRepository,
    );

    return posts;
  }
}
