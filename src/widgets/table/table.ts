import { Component, HostListener } from '@angular/core';
import { CompanyAPI } from '@/entities/company/api/company.api';
import { Company } from '@/entities/company/model/types';
import { Sort, FilterOptions } from '@/shared/api/types';

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table {
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

  @HostListener('mouselistener')
  scroll(event: Event) {
    console.log('event', event)
  }

  async ngOnInit(): Promise<void> {
    this.rows = await this.companyAPI.get(this.page, this.sort, this.filter);
  }
}
