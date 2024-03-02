import { BehaviorSubject } from 'rxjs';
import { Company } from './types';
import { Sort, FilterOptions } from '@/shared/api/types';

type CompanyStore = {
  companies: Company[];
  page: number;
  sort: Sort<Company>;
  filter?: FilterOptions<Company>;
}

export const companyStore = new BehaviorSubject<CompanyStore>({
  companies: [],
  page:1,
  sort: {},
});
