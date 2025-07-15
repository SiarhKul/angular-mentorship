import { ECategories } from '../../../features/categories/types/enums';
import { TUUID } from '../../../shared/types/types';

export interface ITransaction {
  amount: number;
  category: ECategories;
  categories: string[];
  date: Date;
  description: string;
  id?: TUUID;
  payee: string;
  title: string;
}
