import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetUserParamDto {
  @ApiProperty({
    description: 'Get user with a specific id',
    example: 23,
  })
  @IsInt()
  id: number;
}
