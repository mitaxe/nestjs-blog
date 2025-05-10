import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './providers/posts.service';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { TagsModule } from 'src/tags/tags.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { CreatePostProvider } from './providers/create-post.provider';
import { GetPostsProvider } from './providers/get-posts.provider';

@Module({
  controllers: [PostsController],
  providers: [PostsService, CreatePostProvider, GetPostsProvider],
  imports: [UsersModule, TagsModule, TypeOrmModule.forFeature([Post, MetaOption]), PaginationModule],
})
export class PostsModule {}
