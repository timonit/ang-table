import { CompanyAPI } from '@/entities/company/api/company.api';
import { companyStore } from '@/entities/company/model/company.store';
import { Company } from '@/entities/company/model/types';
import { FilterOptions } from '@/shared/api/types';

export async function filterFeat(filter: FilterOptions<Company>) {
  const sort = companyStore.value.sort;
  companyStore.next({
    sort,
    filter:companyStore.value.filter,
    companies: companyStore.value.companies,
    length: companyStore.value.length,
    countPage: companyStore.value.countPage,
    page: companyStore.value.page,
    fetching: true,
  });

  const companyAPI = new CompanyAPI();
  const { list, length, pageCount, page } = await companyAPI.get(1, sort, filter);
  companyStore.next({
    length,
    page,
    sort,
    filter,
    countPage: pageCount,
    companies: list,
    fetching: false,
  });
}
