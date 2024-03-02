import { Component, HostListener, Input, NgZone, OnInit } from '@angular/core';
import { CompanyAPI } from '@/entities/company/api/company.api';
import { Company } from '@/entities/company/model/types';
import { Sort, FilterOptions } from '@/shared/api/types';
import { COLUMNS } from './constants';
import { ColDTO } from './types';
import { companyStore } from '@/entities/company/model/company.store';

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table {
  @Input() collumns: ColDTO[] = COLUMNS;

  @Input() rows: { [p: string]: any }[] = [];

  select(colDTO: ColDTO) {
    const index = this.collumns.findIndex((col) => col.prop === colDTO.prop);
    if (index > -1) this.collumns[index].isActive = true;
  }

  unselect() {
    this.collumns.forEach((col) => (col.isActive = false));
  }
}
