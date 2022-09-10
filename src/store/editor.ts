import { Resource } from "@/core/classes/base/Resource";
import { Item } from "@/core/classes/game/Item";
import { Level } from "@/core/classes/game/Level";
import { Monster } from "@/core/classes/game/Monster";
import { Room } from "@/core/classes/game/Room";
import IBaseFS from "@/utils/uniFS/IBaseFS";

import { v4 as uuid } from "uuid";
import { acceptHMRUpdate, defineStore } from "pinia";
import { createFS } from "@/utils/uniFS/createFS";
import { Asset } from "@/core/classes/game/Asset";

import { restoreClass } from "@/core/helpers/restoreClass";
import { restoreEvents } from "@/core/helpers/restoreEvents";
import { DoorDesc } from "@/core/classes/game/DoorDesc";
import { runMigration } from "@/core/helpers/migrateProject";

/** Текущая версия проекта */
const CURRENT_VERSION = 2;

/** Хранилище редактора контента */
export const useEditorStore = defineStore("editor", {
  state: () => ({
    fs: null as Nullable<IBaseFS>,
    name: "",
    dir: "",
    uuid: "",
    version: CURRENT_VERSION,

    isOpen: false,
    bosses: new Map<string, Resource>(),
    characters: new Map<string, Resource>(),
    items: new Map<string, Item>(),
    levels: new Map<string, Level>(),
    monsters: new Map<string, Monster>(),
    objects: new Map<string, Resource>(),
    assets: new Map<string, Asset>(),
    rooms: new Map<string, Room>(),
    scripts: new Map<string, Resource>(),
    doorDescs: new Map<string, DoorDesc>(),
  }),

  actions: {
    /**
     * Создать новый проект мода
     * @param name - Название мода
     * @param dir - Папка мода
     */
    async createProject(name: string, dir: string) {
      const fs = this.fs as IBaseFS;

      if (!fs) {
        throw "FS not available";
      }

      await fs.createDirectory(dir);
      await fs.setRoot(dir);

      this.name = name;
      this.dir = dir;
      this.uuid = uuid();

      await Promise.all([
        fs.createDirectory("levels"),
        fs.createDirectory("rooms"),
        fs.createDirectory("monsters"),
        fs.createDirectory("bosses"),
        fs.createDirectory("objects"),
        fs.createDirectory("items"),
        fs.createDirectory("characters"),
        fs.createDirectory("scripts"),
        fs.createDirectory("doorDescs"),
        (
          await fs.createFile("project.json")
        ).writeAllText(
          JSON.stringify({
            name,
            uuid: this.uuid,
            version: this.version,
          })
        ),
      ]);

      const assets = await fs.createDirectory("assets");
      await Promise.all([
        (await assets.createFile("index.json")).writeAllText("[]"),
        assets.createDirectory("images"),
        assets.createDirectory("audio"),
        assets.createDirectory("video"),
        assets.createDirectory("fonts"),
        assets.createDirectory("scripts"),
        assets.createDirectory("json"),
        assets.createDirectory("other"),
      ]);

      setTimeout(() => {
        this.isOpen = true;
      }, 60);
    },

    /** Открыть существующий проект */
    async loadProject() {
      this.fs = await createFS();
      const fs = this.fs;
      await fs.init();

      const meta = JSON.parse(
        await (await fs.getFile("project.json")).readAllText()
      );

      this.name = meta.name;
      this.uuid = meta.uuid;
      this.version = meta.version ?? 1;
      this.dir = fs.name;

      if (meta.version !== CURRENT_VERSION) {
        await runMigration(this.version, CURRENT_VERSION, fs);
      }

      (await fs.getDirectories()).forEach(async (dir) => {
        if (dir.name === "assets") {
          const index = await dir.getFile("index.json");
          const assets = JSON.parse(await index.readAllText());
          assets.forEach(async (asset: Asset) => {
            const restoredAsset = restoreClass<Asset>(asset, Asset);
            this.assets.set(asset.id, restoredAsset);
          });
          return;
        }

        const data: Map<string, Resource> = new Map();

        (await dir.getFiles()).forEach(async (file) => {
          let res;

          // Восстановление классов, поскольку из JSON'a мы получаем только данные
          switch (dir.name) {
            case "levels":
              res = restoreClass<Level>(await file.readAllText(), Level);
              break;
            case "rooms":
              res = restoreClass<Room>(await file.readAllText(), Room);
              break;
            case "monsters":
              res = restoreClass<Monster>(await file.readAllText(), Monster);
              break;
            case "bosses":
              res = restoreClass<Resource>(await file.readAllText(), Resource);
              break;
            case "objects":
              res = restoreClass<Resource>(await file.readAllText(), Resource);
              break;
            case "items":
              res = restoreClass<Item>(await file.readAllText(), Item);
              break;
            case "characters":
              res = restoreClass<Resource>(await file.readAllText(), Resource);
              break;
            case "scripts":
              res = restoreClass<Resource>(await file.readAllText(), Resource);
              break;
            case "doorDescs":
              res = restoreClass<DoorDesc>(await file.readAllText(), DoorDesc);
              break;
            default:
              res = restoreClass<Resource>(await file.readAllText(), Resource);
              break;
          }

          data.set(res.id, res);
        });

        (this as unknown as Indexable<Map<string, Resource>>)[dir.name] = data;

        console.log(
          "%cEditor",
          "background-color: #9E9E9E; color: #333; border-radius: 100px;padding: 1px 4px",
          `Loaded ${data.size} ${dir.name}`
        );
      });

      setTimeout(() => {
        this.isOpen = true;
        // Восстановление классов ивентов
        this.rooms.forEach((room) => {
          room.events = restoreEvents(room.events);
        });
      }, 60);
    },

    /**
     * Добавить новый ресурс
     * @param type - Тип ресурса
     * @param resource - Ресурс для сохранения
     */
    async createResource(type: string, resource: Resource) {
      const state = this as unknown as Indexable<Map<string, Resource>>;
      state[type].set(resource.id, resource);
      return await this.saveResource(type, resource.id);
    },

    /**
     * Удалить ресурс из мода
     * @param id - Идентификатор ресурса
     * @param type - Тип ресурса
     */
    async deleteResource(type: string, id: string) {
      const fs = this.fs as IBaseFS;
      const dir = await fs.getDirectory(type);
      const file = await dir.getFile(`${id}.json`);
      await file.delete();
      (this as unknown as Indexable<Map<string, Resource>>)[type].delete(id);
    },

    /**
     * Обновить ресурс
     * @param type - Тип ресурса
     * @param resource - Ресурс для обновления
     */
    async updateResource(type: string, resource: Resource) {
      (this as unknown as Indexable<Map<string, Resource>>)[type].set(
        resource.id,
        resource
      );
      await this.saveResource(type, resource.id);
    },

    /**
     * Сохранить ресурс на диск
     * @param id - Идентификатор ресурса
     * @param type - Тип ресурса
     * @returns Файл с сохраненным ресурсом
     */
    async saveResource(type: string, id: string) {
      const state = this as unknown as Indexable<Map<string, Resource>>;
      const res = state[type].get(id);
      const fs = this.fs as IBaseFS;
      const dir = await fs.getDirectory(type);
      const file = await dir.createFile(`${id}.json`);
      console.log(
        "%cEditor",
        "background-color: #9E9E9E; color: #333; border-radius: 100px;padding: 1px 4px",
        `Saving ${id} to ${type}`,
        res
      );
      await file.writeAllText(JSON.stringify(res));

      return file;
    },

    /**
     * Сохранить ассет
     * @param asset - Ассет для сохранения
     */
    async saveAsset(asset: Asset) {
      const fs = this.fs as IBaseFS;
      const assetCopy = Object.assign({}, asset);

      if (!this.assets.has(asset.id)) {
        this.assets.set(asset.id, assetCopy);
      }

      delete assetCopy.file;

      const assetsDir = await fs.getDirectory("assets");

      const indexCopy: Asset[] = [];
      this.assets.forEach((asset) => {
        const assetCopy = JSON.parse(JSON.stringify(asset));
        delete assetCopy.file;
        indexCopy.push(assetCopy);
      });

      await (
        await assetsDir.getFile(`index.json`)
      ).writeAllText(JSON.stringify(indexCopy));
    },

    /**
     * Удалить ассет
     * @param asset - Ассет для удаления
     */
    async deleteAsset(asset: Asset) {
      const fs = this.fs as IBaseFS;
      const assetsDir = await fs.getDirectory("assets");
      const targetDir = await assetsDir.getDirectory(asset.type);
      await targetDir.deleteFile(`${asset.id}.${asset.extension}`);
      this.assets.delete(asset.id);

      const indexCopy: Asset[] = [];
      this.assets.forEach((asset) => {
        const assetCopy = JSON.parse(JSON.stringify(asset));
        delete assetCopy.file;
        indexCopy.push(assetCopy);
      });

      await (
        await assetsDir.getFile(`index.json`)
      ).writeAllText(JSON.stringify(indexCopy));
    },
  },
});

const meta = import.meta as any;
if (meta.hot) meta.hot.accept(acceptHMRUpdate(useEditorStore, meta.hot));
if (meta.webpackHot)
  meta.webpackHot.accept(acceptHMRUpdate(useEditorStore, meta.webpackHot));
