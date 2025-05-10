import { ApiProperty } from '@nestjs/swagger';
import { IsJSON, IsNotEmpty } from 'class-validator';

export class CreateMetaOptionsDto {
  @ApiProperty({
    description: 'The value of the meta option',
    example: '{"sidebarEnabled": true, "footerActive": true}',
  })
  @IsNotEmpty()
  @IsJSON()
  metaValue: string;
}
