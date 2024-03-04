import { CompanyAPI } from '@/entities/company/api/company.api';
import { companyStore } from '@/entities/company/model/company.store';
import { Company } from '@/entities/company/model/types';
import { Sort} from '@/shared/api/types';

export async function sortFeat(sort: Sort<Company>) {
  const filter = companyStore.value.filter;
  companyStore.next({
    sort,
    filter,
    companies: companyStore.value.companies,
    length: companyStore.value.length,
    countPage: companyStore.value.countPage,
    page: companyStore.value.page,
    fetching: true,
  });

  const companyAPI = new CompanyAPI();
  const res = await companyAPI.get(1, sort, filter);
  companyStore.next({
    companies: res.list,
    length: res.length,
    countPage: res.pageCount,
    page: res.page,
    sort,
    filter,
    fetching: false,
  });
}
