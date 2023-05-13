import { AssetType } from '@/core/types/game/AssetType';
import { ResourceCollectionType } from '@/core/types/game/ResourceCollectionType';
import { ResourceType } from '@/core/types/game/ResourceType';
import { dynamicImportUsingId } from '@/core/utils/dynamicImport';
import { fancyLog } from '@/core/utils/fancyLog';
import { useEditorStore } from '@/store/editor';
import IBaseFS from '@/utils/uniFS/IBaseFS';
import { Asset } from './resources/Asset';
import { Item } from './resources/Item';

export class Library {
  items: Map<string, Item> = new Map();
  assets: Map<string, Asset> = new Map();

  loadItems() {
    this.items = dynamicImportUsingId(
      require.context('../../content/items/scripts', true, /\.ts$/, 'sync')
    ) as Map<string, Item>;

    fancyLog('log', 'Library', `Loaded ${this.items.size} items`, '#29B6F6');
  }

  loadAll() {
    this.loadItems();
  }

  getResourceById<T>(id: string, type: ResourceType) {
    const editor = useEditorStore();
    if (editor.isOpen) {
      const editorMap = (editor as unknown as Record<string, Map<string, T>>)[
        type
      ];
      if (editorMap && editorMap.has(id)) {
        return editorMap.get(id);
      }
    }

    const libMap = this[type as keyof Library] as Map<string, T> | undefined;
    if (libMap && libMap.has(id)) {
      return libMap.get(id);
    }

    throw `Resource with type ${type} and id ${id} not found`;
  }

  async getAssetURL(id: string): Promise<string> {
    const asset = this.getResourceById<Asset>(id, ResourceType.ASSET);
    if (!asset) {
      throw `Asset with id ${id} not found`;
    }

    if (useEditorStore().fs == null) {
      throw `Asset with id ${id} not found`;
    }
    const url = await (
      await asset?.getFile(
        await (useEditorStore().fs as IBaseFS).getDirectory('assets')
      )
    )?.getUrl();
    if (url) {
      return url;
    }
    throw `Asset with id ${id} not found`;
  }

  getResourcesByType<T>(
    type: ResourceType,
    storage: ResourceCollectionType = ResourceCollectionType.ALL
  ): Map<string, T> {
    let editorMap = new Map(),
      libMap = new Map();

    if (storage != ResourceCollectionType.CUSTOM) {
      const res = this[type as keyof Library] as Map<string, T> | undefined;

      if (res) {
        libMap = new Map([...res]);
      }
    }

    if (storage != ResourceCollectionType.BUILTIN) {
      const editor = useEditorStore();
      editorMap = new Map([
        ...(editor as unknown as Record<string, Map<string, T>>)[type],
      ]);
    }

    return new Map([...libMap, ...editorMap]);
  }

  getAssetsByType(
    type: AssetType | null = null,
    storage: ResourceCollectionType = ResourceCollectionType.ALL
  ): Map<string, Asset> {
    let editorMap = new Map(),
      libMap = new Map();

    if (storage != ResourceCollectionType.CUSTOM) {
      libMap = new Map(
        [...this.assets].filter((asset) =>
          type ? asset[1].type == type : true
        )
      );
    }

    if (storage != ResourceCollectionType.BUILTIN) {
      const editor = useEditorStore();
      editorMap = new Map(
        [...editor.assets].filter((asset) =>
          type ? asset[1].type == type : true
        )
      );
    }

    return new Map([...libMap, ...editorMap]);
  }
}
