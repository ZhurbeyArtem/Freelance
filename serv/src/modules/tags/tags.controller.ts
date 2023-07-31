import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Tags } from 'src/entities/tags.entity';
import { TagsService } from './tags.service';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { TagDto } from '../dto/tag.dto';

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @ApiOperation({ summary: 'Getting all tags' })
  @ApiResponse({ status: 200, type: [Tags] })
  @Get()
  getAll(): Promise<Tags[]> {
    return this.tagsService.getAllTags();
  }

  @ApiOperation({ summary: 'Create new tag ' })
  @ApiResponse({ status: 200, type: [Tags] })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: TagDto): Promise<Tags | string> {
    return this.tagsService.createTag(dto);
  }
}
