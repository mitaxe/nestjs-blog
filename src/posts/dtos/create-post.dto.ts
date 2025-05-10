import {
  IsString,
  IsEnum,
  IsOptional,
  IsUrl,
  IsArray,
  ValidateNested,
  MinLength,
  MaxLength,
  IsNotEmpty,
  Matches,
  IsJSON,
  IsISO8601,
  IsInt,
} from 'class-validator';
import { PostStatus, PostType } from './enums/create-post.enum';
import { CreateMetaOptionsDto } from '../../meta-options/dtos/create-post-meta-options.dto';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'The title of the post',
    example: 'My First Post',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(30)
  title: string;

  @ApiProperty({
    enum: PostType,
    description: 'The type of the post',
    example: 'post',
  })
  @IsEnum(PostType)
  postType: PostType;

  @ApiProperty({
    description: 'The slug of the post',
    example: 'my-first-post',
  })
  @IsString()
  @Matches(/^[a-z0-9-]+$/, {
    message: 'Slug must contain only lowercase letters, numbers, and hyphens',
  })
  @MaxLength(256)
  slug: string;

  @ApiProperty({
    enum: PostStatus,
    description: 'The status of the post',
    example: 'draft',
  })
  @IsEnum(PostStatus)
  status: PostStatus;

  @ApiPropertyOptional({
    description: 'The content of the post',
    example: '{\"hey\":\"world\"}',
  })
  @IsJSON()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({
    description: 'The schema of the post',
    example: 'This is the schema of my first post',
  })
  @IsString()
  @IsOptional()
  schema?: string;

  @ApiPropertyOptional({
    description: 'The feature image URL of the post',
    example: 'https://example.com/feature-image.jpg',
  })
  @IsUrl()
  @MaxLength(1024)
  @IsOptional()
  featureImageUrl: string;

  @ApiPropertyOptional({
    description: 'The publish date of the post',
    example: '2024-03-20T10:00:00Z',
  })
  @IsISO8601()
  @IsOptional()
  publishOn?: string;

  @ApiPropertyOptional({
    type: 'array',
    description: 'The array of tag ids of the post',
    example: [1, 2],
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  tags: number[];

  @ApiPropertyOptional({
    type: 'object',
    description: 'The meta options of the post',
    properties: {
      metaValue: {
        type: 'string',
        description: 'The metaValue is a JSON object',
        example: '{ "sidebarEnabled": true, "footerActive": true }',
      },
    },
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateMetaOptionsDto)
  metaOptions?: CreateMetaOptionsDto;
}
