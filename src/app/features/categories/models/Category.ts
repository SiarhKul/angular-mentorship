import {ICategory} from "../types/interfaces";

export class Category implements ICategory {
  id?: number;
  type!: number
  name!: string;

  constructor() {
  }

  static builder() {
    return new Category();
  }

  setId(id: number) {
    this.id = id;
    return this
  }

  setName(name: string) {
    this.name = name;
    return this
  }

  setType(type: number) {
    this.type = type;
    return this
  }

  build(): this {
    return this
  }

}
