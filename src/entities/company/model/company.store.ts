import { BehaviorSubject } from 'rxjs';
import { Company } from './types';

export const companyStore = new BehaviorSubject<Company[]>([]);
