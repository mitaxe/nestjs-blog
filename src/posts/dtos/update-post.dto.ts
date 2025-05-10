import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto  extends PartialType(CreatePostDto){
  @ApiProperty({
    description: 'The ID of the post to update',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  id: number;
}
