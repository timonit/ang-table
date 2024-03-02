import { CompanyAPI } from '@/entities/company/api/company.api';
import { CompanyStore, companyStore } from '@/entities/company/model/company.store';
import { Company } from '@/entities/company/model/types';
import { filterFeat } from '@/features/table/model/filter.feat';
import { DataList } from '@/shared/api/api';
import { Sort, FilterOptions } from '@/shared/api/types';
import { Pagination } from '@/shared/ui/pagination/pagination';
import { Table } from '@/widgets/table/table';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'table-page',
  standalone: true,
  templateUrl: './table.page.html',
  imports: [Table, Pagination],
  styleUrl: './table.page.scss',
})
export class TablePage {
  data: { [p: string]: any }[] = [];

  api = new CompanyAPI();
  store = companyStore;

  page = 1;

  sort: Sort<Company> = {};

  filter?: FilterOptions<Company>;

  pagination = {
    hasPrevButton: false,
    hasNextButton: false,
    pageCount: 1,
    page: 1,
  }

  setStoreData(data: DataList<Company>) {
    this.store.next({
      sort: this.sort,
      filter: this.filter,
      companies: data.list,
      length: data.length,
      page: data.page,
      countPage: data.pageCount
    });
  }

  changePage(page:number) {
    this.api
      .get(page, this.sort, this.filter)
      .then(this.setStoreData.bind(this));
  }

  constructor() {
    this.store.subscribe((v) => {
      console.log('asdasd', v);
      this.data = v.companies;
      this.page = v.page;
      this.sort = v.sort;
      this.filter = v.filter;

      this.pagination = {
        hasPrevButton: v.page > 1,
        hasNextButton: v.countPage > 1 && v.page < v.countPage,
        pageCount: v.countPage,
        page: v.page,
      }
    });

    this.api
      .get(this.page, this.sort, this.filter)
      .then(this.setStoreData.bind(this));

    setTimeout(() => {
      console.log('aaaa')
      filterFeat({age: 30});
    }, 5000);
  }
}
