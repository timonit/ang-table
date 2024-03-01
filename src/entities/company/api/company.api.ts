import { API } from '@/shared/api/api';
import { Company } from '../model/types';
import data from './data';

export class CompanyAPI extends API<Company> {
  constructor() {
    super(data);
  }
}
