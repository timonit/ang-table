import { Component, HostListener } from '@angular/core';
import { CompanyAPI } from '@/entities/company/api/company.api';
import { Company } from '@/entities/company/model/types';
import { Sort, FilterOptions } from '@/shared/api/types';
import { COLUMNS } from './constants';
import { ColDTO } from './types';

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table {
  companyAPI = new CompanyAPI();

  collumns: ColDTO[] = COLUMNS;

  rows: { [p: string]: any }[] = [];

  page = 1;

  sort: Sort<Company> = {};

  filter?: FilterOptions<Company>;

  select(colDTO: ColDTO) {
    const index = this.collumns.findIndex((col) => col.prop === colDTO.prop);
    if (index > -1) this.collumns[index].isActive = true
  }

  unselect() {
    this.collumns.forEach((col) => col.isActive = false);
  }

  async ngOnInit(): Promise<void> {
    this.rows = await this.companyAPI.get(this.page, this.sort, this.filter);
  }
}
