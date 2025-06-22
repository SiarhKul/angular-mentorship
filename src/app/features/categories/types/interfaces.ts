import { TUUID } from '../../../shared/types/types';

export interface ICategory {
  id?: TUUID;
  type: number;
  name: string;
}
