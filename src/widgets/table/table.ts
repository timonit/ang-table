import { FormBuilder, FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { COLUMNS } from './constants';
import { ColDTO } from './types';
import { sortFeat } from '@/features/table/model/sort.feat';
import { SortType } from '@/shared/api/types';
import { UpIcon } from './sort-icons/up/up.icon';

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.html',
  styleUrl: './table.scss',
  imports: [UpIcon]
})
export class Table {
  @Input() collumns: ColDTO[] = COLUMNS;

  @Input() loading: boolean = false;

  @Input() rows: { [p: string]: any }[] = [];

  collapseCollumn(colName: string, value: boolean) {
    this.collumns.forEach((col, index) => {
      if (colName === col.prop) {
        this.collumns[index].hide = value;
      }
    })
  }

  select(colDTO: ColDTO) {
    const index = this.collumns.findIndex((col) => col.prop === colDTO.prop);
    if (index > -1) this.collumns[index].isActive = true;
  }

  unselect() {
    this.collumns.forEach((col) => (col.isActive = false));
  }

  sortBy(propName: string, sortType: SortType) {
    this.collumns = this.collumns.map((col) => {
      if(col.prop === propName) return { ...col, sorted: sortType};
      return col;
    });

    sortFeat({[propName]: sortType});
  }
}
