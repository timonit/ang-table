import { CompanyAPI } from '@/entities/company/api/company.api';
import { Company } from '@/entities/company/model/types';
import { Sort, FilterOptions } from '@/shared/api/types';
import { Injectable, InjectionToken } from '@angular/core';

@Injectable({
  providedIn: 'any',
})
export class TableService {
  companyAPI = new CompanyAPI();

  collumns: string[] = [
    '_id',
    'isActive',
    'balance',
    'picture',
    'age',
    'name',
    'company',
    'email',
    'address',
    'tags',
    'favoriteFruit',
  ];

  rows: { [p: string]: any }[] = [];

  page = 1;

  sort: Sort<Company> = {};

  filter?: FilterOptions<Company>;

  async fetch(): Promise<void> {
    this.rows = await this.companyAPI.get(this.page, this.sort, this.filter);
  }
}

export const TABLE_SERVICE = new InjectionToken<TableService>('tableService');
