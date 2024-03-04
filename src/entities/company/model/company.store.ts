import { BehaviorSubject } from 'rxjs';
import { Company } from './types';
import { Sort, FilterOptions } from '@/shared/api/types';

export type CompanyStore = {
  companies: Company[];
  page: number;
  countPage: number;
  length: number,
  sort: Sort<Company>;
  filter?: FilterOptions<Company>;
  fetching: boolean;
}

export const companyStore = new BehaviorSubject<CompanyStore>({
  companies: [],
  page:1,
  countPage: 1,
  length: 0,
  sort: {},
  fetching: false,
});
