import { CompanyAPI } from '@/entities/company/api/company.api';
import { companyStore } from '@/entities/company/model/company.store';
import { Company } from '@/entities/company/model/types';
import { Sort} from '@/shared/api/types';

export async function sortFeat(sort: Sort<Company>) {
  console.log('start sort', sort);
  const companyAPI = new CompanyAPI();
  const res = await companyAPI.get(1, sort);
  companyStore.next({
    companies: res.list,
    length: res.length,
    countPage: res.pageCount,
    page: res.page,
    sort,
  });
}
