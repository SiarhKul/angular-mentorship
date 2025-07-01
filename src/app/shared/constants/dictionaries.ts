import { ECategories } from '../../features/categories/types/enums';

export const CATEGORIES = [
  { category: ECategories.INCOME, id: 1 },
  { category: ECategories.EXPENSES, id: 2 },
];

export const CategoryMap = new Map<string, number>([
  [ECategories.UNKNOWN, 0],
  [ECategories.INCOME, 1],
  [ECategories.EXPENSES, 2],
]);
