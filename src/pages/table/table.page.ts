import { CompanyAPI } from '@/entities/company/api/company.api';
import { CompanyStore, companyStore } from '@/entities/company/model/company.store';
import { Company } from '@/entities/company/model/types';
import { filterFeat } from '@/features/table/model/filter.feat';
import { Filter } from '@/features/table/ui/filter/filter';
import { DataList } from '@/shared/api/api';
import { Sort, FilterOptions } from '@/shared/api/types';
import { Pagination } from '@/shared/ui/pagination/pagination';
import { Table } from '@/widgets/table/table';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'table-page',
  standalone: true,
  templateUrl: './table.page.html',
  imports: [Table, Pagination, Filter],
  styleUrl: './table.page.scss',
})
export class TablePage {
  data: { [p: string]: any }[] = [];

  api = new CompanyAPI();
  store = companyStore;

  page = 1;

  sort: Sort<Company> = {};

  loading: boolean = false;

  filter?: FilterOptions<Company>;

  pagination = {
    hasPrevButton: false,
    hasNextButton: false,
    pageCount: 1,
    page: 1,
  }

  fetchData(page: number, sort: Sort<Company>, filter?: FilterOptions<Company>) {
    this.store.next({
      sort: this.store.value.sort,
      filter: this.store.value.filter,
      companies: this.store.value.companies,
      length: this.store.value.length,
      page: this.store.value.page,
      countPage: this.store.value.countPage,
      fetching: true,
    });
    this.api
      .get(page, sort, filter)
      .then(this.setStoreData.bind(this));
  }

  setStoreData(data: DataList<Company>) {
    this.store.next({
      sort: this.sort,
      filter: this.filter,
      companies: data.list,
      length: data.length,
      page: data.page,
      countPage: data.pageCount,
      fetching: false,
    });
  }

  changePage(page:number) {
    this.fetchData(page, this.sort, this.filter);
  }

  changeItemsPerPage(count: number) {
    this.api.itemPerPage = count;
    this.fetchData(1, this.sort, this.filter);
  }

  constructor() {
    this.store.subscribe((v) => {
      this.data = v.companies;
      this.page = v.page;
      this.sort = v.sort;
      this.filter = v.filter;
      this.loading = v.fetching;

      this.pagination = {
        hasPrevButton: v.page > 1,
        hasNextButton: v.countPage > 1 && v.page < v.countPage,
        pageCount: v.countPage,
        page: v.page,
      }
    });

    this.fetchData(this.page, this.sort, this.filter);
  }
}
