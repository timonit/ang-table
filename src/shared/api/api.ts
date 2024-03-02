import * as L from 'lodash';
import { Sort, SortType, FilterOptions } from './types';

export type DataList<T> = {
  length: number;
  list: T[];
  page: number;
  pageCount: number;
}

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

  request(page: number, sort: Sort<T>, filter?: FilterOptions<T>): DataList<T> {
    let list: T[] = [...this.dataSRC];
    let length = list.length;

    if (filter) list = this.filter(list, filter);

    length = list.length;
    let pageCount = Math.floor(length/this.itemPerPage);

    list = this.getSortedData(list, sort);
    list = this.getDataByPage(list, page);

    return {
      list,
      length,
      page,
      pageCount
    };
  }

  async get(page: number = 0, sort: Sort<T>, filter?: FilterOptions<T>): Promise<DataList<T>> {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(this.request(page, sort, filter));
      }, Math.random()*3000);
    })
  }
}
