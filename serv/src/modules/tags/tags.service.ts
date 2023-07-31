import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Tags } from 'src/entities/tags.entity';
import { TagDto } from '../dto/tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tags)
    private tagRepository: Repository<Tags>,
  ) { }

  async createTag(dto: TagDto): Promise<Tags | string> {
    try {
      const featureTag = await this.getTagByName(dto.name);
      if (featureTag) {
        throw new HttpException(
          'a tage with the same name already exists ',
          HttpStatus.BAD_REQUEST,
        );
      }
      const tag = await this.tagRepository.save(dto);
      return tag;
    } catch (e) {
      return e;
    }
  }

  async getTagByName(name: string): Promise<Tags> {
    try {
      const tag = await this.tagRepository.findOne({ where: { name } });
      return tag;
    } catch (e) {
      return e;
    }
  }

  async getTagId(id: number): Promise<Tags> {
    try {
      const tag = await this.tagRepository.findOne({ where: { id } });
      return tag;
    } catch (e) {
      return e;
    }
  }

  async getTagsByName(names: string[]): Promise<Tags[]> {
    try {
      return await this.tagRepository.find({ where: { name: In(names) } });
    } catch (e) {
      return e;
    }
  }

  async getAllTags(): Promise<Tags[]> {
    try {
      const tags = await this.tagRepository.find();
      return tags;
    } catch (e) {
      return e;
    }
  }
}
