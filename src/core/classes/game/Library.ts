import { dynamicImportUsingId } from "@/core/helpers/dynamicImport";
import { Item } from "./Item";

export class Library {

  items: Map<number, Item> = new Map();

  loadItems() {
    this.items = dynamicImportUsingId(require.context('../../content/items', true, /\.ts$/, 'sync')) as Map<number, Item>;
    this.log(`Загружено ${this.items.size} предметов`);
  }

  loadAll() {
    this.loadItems();
  }

  private log(text: string, type: 'log' | 'warn' | 'error' = 'log') {

    console[type](text);

  }

}