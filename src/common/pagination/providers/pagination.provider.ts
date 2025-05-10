import { Inject, Injectable } from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { ObjectLiteral, Repository } from 'typeorm';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { Paginated } from 'src/common/interfaces/paginated.interface';

@Injectable()
export class PaginationProvider {
  constructor(@Inject(REQUEST) private readonly request: Request) {}
  public async paginateQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>,
  ): Promise<Paginated<T>> {
    const { page, limit } = paginationQuery;
    const skip = (page - 1) * limit;
    const results = await repository.find({
      take: limit,
      skip,
    });

    const baseUrl = this.request.protocol + '://' + this.request.get('host');
    const newUrl = new URL(this.request.url, baseUrl);

    const totalItems = await repository.count();
    const totalPages = Math.ceil(totalItems / limit);
    const nextPage = paginationQuery.page === totalPages ? paginationQuery.page : paginationQuery.page + 1;
    const previousPage = paginationQuery.page === 1 ? paginationQuery.page : paginationQuery.page - 1;

    const finalResponse: Paginated<T> = {
      data: results,
      meta: {
        itemsPerPage: limit,
        totalItems,
        totalPages,
        currentPage: paginationQuery.page,
      },
      links: {
        first: `${baseUrl}${newUrl.pathname}?page=1&limit=${limit}`,
        previous: `${baseUrl}${newUrl.pathname}?page=${previousPage}&limit=${limit}`,
        current: `${baseUrl}${newUrl.pathname}?page=${paginationQuery.page}&limit=${limit}`,
        next: `${baseUrl}${newUrl.pathname}?page=${nextPage}&limit=${limit}`,
        last: `${baseUrl}${newUrl.pathname}?page=${totalPages}&limit=${limit}`,
      },
    };

    return finalResponse;
  }
}
