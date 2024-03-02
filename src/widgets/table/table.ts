import { Component, Input } from '@angular/core';
import { COLUMNS } from './constants';
import { ColDTO } from './types';
import { sortFeat } from '@/features/table/model/sort.feat';
import { SortType } from '@/shared/api/types';

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

  sortBy(propName: string, sortType: SortType) {
    this.collumns = this.collumns.map((col) => {
      if(col.prop === propName) return { ...col, sorted: sortType};
      return col;
    });

    sortFeat({[propName]: sortType});
  }
}
