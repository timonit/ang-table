import { CompanyAPI } from '@/entities/company/api/company.api';
import { companyStore } from '@/entities/company/model/company.store';
import { Company } from '@/entities/company/model/types';
import { FilterOptions } from '@/shared/api/types';

export async function filterFeat(filter: FilterOptions<Company>) {
  console.log('start filter', filter);
  const companyAPI = new CompanyAPI();
  const sort = companyStore.value.sort;
  const { list, length, pageCount, page } = await companyAPI.get(1, sort, filter);
  companyStore.next({
    length,
    page,
    sort,
    filter,
    countPage: pageCount,
    companies: list,
  });
}
