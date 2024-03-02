import { CompanyAPI } from '@/entities/company/api/company.api';
import { companyStore } from '@/entities/company/model/company.store';
import { Company } from '@/entities/company/model/types';
import { Sort} from '@/shared/api/types';

export async function sortFeat(sort: Sort<Company>) {
  console.log('start sort', sort);
  const companyAPI = new CompanyAPI();
  const companies = await companyAPI.get(1, sort);
  companyStore.next({
    companies,
    page: 1,
    sort: {},
  });
}
