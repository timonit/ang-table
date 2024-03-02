import { CompanyAPI } from '@/entities/company/api/company.api';
import { companyStore } from '@/entities/company/model/company.store';
import { Company } from '@/entities/company/model/types';
import { Sort, FilterOptions } from '@/shared/api/types';
import { Table } from '@/widgets/table/table';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Table],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  data: { [p: string]: any }[] = [];

  api = new CompanyAPI();
  store = companyStore;

  page = 1;

  sort: Sort<Company> = {};

  filter?: FilterOptions<Company>;

  constructor() {
    this.store.subscribe((v) => {
      this.data = v;
    });
    this.api
      .get(this.page, this.sort, this.filter)
      .then(this.store.next.bind(this.store));
  }
}
