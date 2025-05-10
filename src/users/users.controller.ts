import {
  Controller,
  Get,
  Post,
  Param,
  Patch,
  ParseIntPipe,
  Body,
  Query,
  DefaultValuePipe,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUserParamDto } from './dtos/get-user-param.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './providers/users.service';
import {
  ApiQuery,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreateManyUsersDto } from './dtos/create-many-users.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-types.enums';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  /**
   * @limit - amount of users returned from the request. Default is 10.
   * @page - page number. Default is 1.
   * @id - user id. Optional
   */
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get users',
  })
  @ApiResponse({
    status: 200,
    description: 'Users fetched successfully',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Amount of users returned from the request. Default is 10.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number. Default is 1.',
  })
  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  public getUsers(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.usersService.findAll(limit, page);
  }

  @ApiBearerAuth()
  @Get('{/:id}')
  @ApiOperation({
    summary: 'Get user by id',
    description: 'Get user by id',
  })
  @ApiResponse({
    status: 200,
    description: 'User fetched successfully',
  })
  public getUserById(@Param() getUserParamDto: GetUserParamDto) {
    return this.usersService.findOneById(getUserParamDto.id);
  }

  @ApiOperation({
    summary: 'Create a new user',
    description: 'Creates a new user with the given data',
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
  })
  @Auth(AuthType.None)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  public createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @ApiBearerAuth()
  @Patch()
  public updateUser(@Body() patchUserDto: PatchUserDto) {
    return patchUserDto;
  }

  @ApiBearerAuth()
  @Delete('/:id')
  public deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }

  @Post('/create-many')
  @Auth(AuthType.None)
  public createManyUsers(@Body() createManyUsersDto: CreateManyUsersDto) {
    return this.usersService.createManyUsers(createManyUsersDto);
  }
}
