import * as L from 'lodash';
import { Sort, SortType, FilterOptions } from './types';

export class API<T> {
  dataSRC: any[];

  itemPerPage = 10;

  setItemPerPage(val: number) {
    this.itemPerPage = val;
  }

  constructor(dataSRC: any[]) {
    this.dataSRC = dataSRC;
  }

  getSortedData(dataList: T[], sort: Sort<T>): T[] {
    const props: string[] = [];
    const sortTypes: SortType[] = [];

    Object.entries(sort).forEach(([prop, sortType]) => {
      props.push(prop);
      sortTypes.push(sortType as SortType);
    });

    return L.orderBy(dataList, props, sortTypes);
  }

  filter(dataList: T[], filter: {[p:string]: any}): T[] {
    // @ts-ignore
    return L.filter<T[]>(dataList, filter);
  }

  getDataByPage(listData: T[], page: number): T[] {
    const startIndex = (page - 1) * this.itemPerPage;
    return listData.slice(startIndex, startIndex + this.itemPerPage);
  }

  request(page: number, sort: Sort<T>, filter?: FilterOptions<T>): T[] {
    let data = [...this.dataSRC];

    if (filter) data = this.filter(data, filter);
    data = this.getSortedData(data, sort);
    data = this.getDataByPage(data, page);

    return data as T[];
  }

  async get(page: number = 0, sort: Sort<T>, filter?: FilterOptions<T>): Promise<T[]> {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(this.request(page, sort, filter));
      }, Math.random()*3000);
    })
  }
}
