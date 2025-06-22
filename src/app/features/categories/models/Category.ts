import { ICategory } from '../types/interfaces';
import { TUUID } from '../../../shared/types/types';

export class Category implements ICategory {
  id?: TUUID;
  type!: number;
  name!: string;

  constructor() {}

  static builder() {
    return new Category();
  }

  setId(id: TUUID) {
    this.id = id;
    return this;
  }

  setName(name: string) {
    this.name = name;
    return this;
  }

  setType(type: number) {
    this.type = type;
    return this;
  }

  build(): this {
    return this;
  }
}
