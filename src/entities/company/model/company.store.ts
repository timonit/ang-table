import { Subject } from 'rxjs';
import { Company } from './types';
import { CompanyAPI } from '../api/company.api';

export const companyStore = new Subject<Company[]>();

const api = new CompanyAPI();

api.get(1, {}).then(r => {
  companyStore.next(r);
})
