import { dynamicImportUsingId } from "@/core/helpers/dynamicImport";
import { Item } from "./Item";

export class Library {
  items: Map<string, Item> = new Map();

  loadItems() {
    this.items = dynamicImportUsingId(
      require.context("../../content/items/scripts", true, /\.ts$/, "sync")
    ) as Map<string, Item>;
    this.log(`Loaded ${this.items.size} items`);
  }

  loadAll() {
    this.loadItems();
  }

  private log(data: any, type: "log" | "warn" | "error" = "log") {
    console[type](
      "%cLibrary",
      "background-color: #29B6F6; color: #333; border-radius: 100px;padding: 1px 4px",
      data
    );
  }
}
