import { Body, Controller, Post } from '@nestjs/common';
import { MetaOptionsService } from './providers/meta-options.service';
import { CreateMetaOptionsDto } from './dtos/create-post-meta-options.dto';
import { ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('meta-options')
export class MetaOptionsController {
  constructor(private readonly metaOptionsService: MetaOptionsService) {}

  @ApiOperation({ summary: 'Create a new meta option' })
  @ApiResponse({ status: 201, description: 'The meta option has been successfully created.' })
  @Post()
  create(@Body() createMetaOptionDto: CreateMetaOptionsDto) {
    return this.metaOptionsService.create(createMetaOptionDto);
  }
}
