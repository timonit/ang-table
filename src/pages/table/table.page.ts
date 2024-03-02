import { CompanyAPI } from '@/entities/company/api/company.api';
import { companyStore } from '@/entities/company/model/company.store';
import { Company } from '@/entities/company/model/types';
import { Sort, FilterOptions } from '@/shared/api/types';
import { Table } from '@/widgets/table/table';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'table-page',
  standalone: true,
  templateUrl: './table.page.html',
  imports: [Table],
  styleUrl: './table.page.scss',
})
export class TablePage {
  data: { [p: string]: any }[] = [];

  api = new CompanyAPI();
  store = companyStore;

  page = 1;

  sort: Sort<Company> = {};

  filter?: FilterOptions<Company>;

  constructor() {
    this.store.subscribe((v) => {
      this.data = v.companies;
      this.page = v.page;
      this.sort = v.sort;
      this.filter = v.filter;
    });

    this.api
      .get(this.page, this.sort, this.filter)
      .then((v) => {
        this.store.next({
          page: this.page,
          sort: this.sort,
          filter: this.filter,
          companies: v
        });
      });
  }
}
