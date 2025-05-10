import {
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Body,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { ApiResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { UpdatePostDto } from './dtos/update-post.dto';
import { GetPostsDto } from './dtos/get-posts.dto';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({
    summary: 'Get all posts',
    description: 'Returns all posts',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns all posts',
  })
  @Get()
  public getPosts(
    @Query() getPostsDto: GetPostsDto,
  ) {
    return this.postsService.findAll(getPostsDto);
  }

  @ApiOperation({
    summary: 'Create a new post',
    description: 'Creates a new post with the given data',
  })
  @ApiResponse({
    status: 201,
    description: 'The post has been successfully created.',
    type: CreatePostDto,
  })
  @Post()
  public createPost(
    @Body() createPostDto: CreatePostDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.postsService.create(createPostDto, user);
  }

  @ApiOperation({
    summary: 'Update a post',
    description: 'Updates a post with the given data',
  })
  @ApiResponse({
    status: 200,
    description: 'The post has been successfully updated.',
    type: UpdatePostDto,
  })
  @Patch()
  public updatePost(
    @Body() updatePostDto: UpdatePostDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.postsService.update(updatePostDto, user);
  }

  @ApiOperation({
    summary: 'Delete a post',
    description: 'Deletes a post with the given id',
  })
  @ApiResponse({
    status: 200,
    description: 'The post has been successfully deleted.',
  })
  @ApiParam({
    name: 'id',
    description: 'The id of the post to delete',
    example: 1,
    type: Number,
  })
  @Delete(':id')
  public deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.delete(id);
  }
}
