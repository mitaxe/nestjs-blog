import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MetaOption } from "../meta-option.entity";
import { CreateMetaOptionsDto } from "../dtos/create-post-meta-options.dto";

@Injectable()
export class MetaOptionsService {
  constructor(
    @InjectRepository(MetaOption)
    private metaOptionsRepository: Repository<MetaOption>,
  ) {}

  public async create(createMetaOptionsDto: CreateMetaOptionsDto) {
    const metaOption = this.metaOptionsRepository.create(createMetaOptionsDto);
    return this.metaOptionsRepository.save(metaOption);
  }
}