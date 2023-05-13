import { useEditorStore } from '@/store/editor';
import { Room } from '../classes/game/resources/Room';
import { restoreMap } from './restoreMap';
import IBaseFS from '@/utils/uniFS/IBaseFS';
import { restoreClass, upgradeClass } from './restoreClass';
import { asyncWait } from './asyncWait';
import { fancyLog } from './fancyLog';
import { Asset } from '../classes/game/resources/Asset';
import { DoorDesc } from '../classes/game/resources/DoorDesc';
import { Item } from '../classes/game/resources/Item';
import { Level } from '../classes/game/resources/Level';
import { Monster } from '../classes/game/resources/Monster';
import { Resource } from '../classes/base/Resource';
import { RoomScene } from '../classes/game/resources/sub/room/RoomScene';
import { EntityInstance } from '../classes/game/resources/sub/gfx/EntityInstance';
import { restoreEvents } from './restoreEvents';
import { EntityObject } from '../classes/game/resources/EntityObject';

let editor: ReturnType<typeof useEditorStore>;

const upgradeFileds = async (fs: IBaseFS) => {
  (await fs.getDirectories()).forEach(async (dir) => {
    if (dir.name === 'assets') {
      const index = await dir.getFile('index.json');
      const assets = JSON.parse(await index.readAllText());
      const upgradedAssets: Asset[] = [];
      assets.forEach(async (asset: Asset) => {
        const restoredAsset = upgradeClass<Asset>(asset, Asset);
        upgradedAssets.push(restoredAsset);
      });
      index.writeAllText(JSON.stringify(upgradedAssets));
      return;
    }

    (await dir.getFiles()).forEach(async (file) => {
      let res;

      // Восстановление классов, поскольку из JSON'a мы получаем только данные
      switch (dir.name) {
        case 'levels':
          res = restoreClass<Level>(await file.readAllText(), Level);
          break;
        case 'rooms':
          res = restoreClass<Room>(await file.readAllText(), Room);

          res.events = restoreEvents(res.events, upgradeClass);
          if (!res.scenes) {
            res.scenes = [new RoomScene()];
          }

          res.scenes = res.scenes.map((scene) => {
            const curScene = upgradeClass<RoomScene>(scene, RoomScene);
            curScene.entities = curScene.entities.map((entity) =>
              upgradeClass<EntityInstance>(entity, EntityInstance)
            );
            return curScene;
          });

          break;
        case 'monsters':
          res = upgradeClass<Monster>(await file.readAllText(), Monster);
          break;
        case 'objects':
          res = upgradeClass<EntityObject>(
            await file.readAllText(),
            EntityObject
          );
          break;
        case 'items':
          res = upgradeClass<Item>(await file.readAllText(), Item);
          break;
        case 'characters':
          res = upgradeClass<Resource>(await file.readAllText(), Resource);
          break;
        case 'scripts':
          res = upgradeClass<Resource>(await file.readAllText(), Resource);
          break;
        case 'doorDescs':
          res = upgradeClass<DoorDesc>(await file.readAllText(), DoorDesc);
          break;
        default:
          res = upgradeClass<Resource>(await file.readAllText(), Resource);
          break;
      }

      await file.writeAllText(JSON.stringify(res));
    });
  });

  await asyncWait(1500);
};

/**
 * Запуск миграции проекта
 * @param from - номер текущей версии проекта
 * @param to - номер целевой версии проекта
 * @param fs - файловая система проекта
 */
export async function runMigration(from: number, to: number, fs: IBaseFS) {
  editor = useEditorStore();
  fancyLog(
    'log',
    'ProjectMigration',
    `Migrate project from v${from} to v${to}`,
    '#FF9800'
  );
  alert(
    'Current project version is outdated. Please wait while we migrate your project to the latest version.'
  );
  await fs.createFile('migration.lock');
  for (let i = from + 1; i <= to; i++) {
    const migration = migrations[i];
    if (migration) {
      try {
        await migration(fs);
      } catch (e) {
        alert('Migration failed. Please report this error to the developer.');
        throw e;
      }
    }
  }

  await (
    await fs.getFile('project.json')
  ).writeAllText(
    JSON.stringify({
      name: editor.name,
      uuid: editor.uuid,
      version: to,
    })
  );

  await asyncWait(1000);
  await fs.deleteFile('migration.lock');
  alert('Migration complete!');
}

/** Хранилище методов для миграции проекта */
const migrations: { [key: number]: any } = {
  /**
   * v2: Node coordinates now stored in RoomEvent.pos,
   * eventNodes.json deprecated
   */
  2: async (fs: IBaseFS) => {
    const roomDir = await fs.getDirectory('rooms');
    const rooms: Room[] = [];

    (await roomDir.getFiles()).forEach(async (file) => {
      rooms.push(restoreClass<Room>(await file.readAllText(), Room));
    });

    await asyncWait(1000);

    const eventNodes = restoreMap(
      JSON.parse(await (await fs.getFile('eventNodes.json')).readAllText())
    ) as Map<string, Map<string, number[]>>;

    const dir = await fs.getDirectory('rooms');

    rooms.forEach(async (room) => {
      room.events.forEach((event) => {
        const node = eventNodes.get(room.id)?.get(event.id);
        if (node) {
          event.pos = { x: Math.round(node[0]), y: Math.round(node[1]) };
        }
      });

      const file = await dir.createFile(`${room.id}.json`);
      fancyLog(
        'log',
        'ProjectMigration',
        [`Saving ${room.id} to rooms`, room],
        '#FF9800'
      );

      await file.writeAllText(JSON.stringify(room));
    });

    await fs.deleteFile('eventNodes.json');
    await asyncWait(100);
  },

  /**
   * v3: StatCheck event now have consumables check
   * Or event now have counter and fail output
   * Select event now have requirments
   */
  3: async (fs: IBaseFS) => {
    const dir = await fs.getDirectory('rooms');
    const files = await dir.getFiles();

    files.forEach(async (file) => {
      const room = JSON.parse(await file.readAllText());
      room.events.forEach(async (event: any) => {
        if (event.type === 'statscheck' && !event.requiredConsumables) {
          event.requiredConsumables = {
            coins: {
              type: 'number',
              enabled: false,
              from: 0,
              to: 0,
            },
            keys: {
              type: 'number',
              enabled: false,
              from: 0,
              to: 0,
            },

            bombs: {
              type: 'number',
              enabled: false,
              from: 0,
              to: 0,
            },

            blueFriends: {
              type: 'number',
              enabled: false,
              from: 0,
              to: 0,
            },

            goldenKey: {
              type: 'boolean',
              enabled: false,
              value: false,
            },

            goldenBomb: {
              type: 'boolean',
              enabled: false,
              value: false,
            },
          };

          delete event.requiredStats?.redHearts;
          delete event.requiredStats?.blueHearts;
          delete event.requiredStats?.blackHearts;
          delete event.requiredStats?.goldenHearts;
          delete event.requiredStats?.whiteHearts;
        } else if (event.type === 'or') {
          if (!event.outputEvents['fail']) {
            event.outputEvents['fail'] = '00000000-0000-0000-0000-000000000000';
          }

          if (!event.counterChecksMode) {
            event.counterEnabled = false;
            event.counterChecksMode = 'success';
            event.counterLabel = '';
          }
        } else if (event.type === 'select') {
          event.variants.forEach((variant: any) => {
            variant.requirment = {
              enabled: false,
              hearts: {
                containers: [],
                hearts: [],
                additionalHearts: [],
              },
              consumables: {
                coins: 0,
                keys: 0,
                bombs: 0,
                blueFriends: 0,

                goldenKey: false,
                goldenBomb: false,
              },
              damageEnabled: false,
              damage: 0,
              damageType: 'default',
              damageTags: [],
            };
          });
        }
      });

      fancyLog(
        'log',
        'ProjectMigration',
        [`Saving ${room.id} to rooms`, room],
        '#FF9800'
      );

      await file.writeAllText(JSON.stringify(room));
    });

    await asyncWait(100);
  },

  /**
   * v4: StatChange now have consumables editor
   */
  4: async (fs: IBaseFS) => {
    const dir = await fs.getDirectory('rooms');
    const files = await dir.getFiles();

    files.forEach(async (file) => {
      const room = JSON.parse(await file.readAllText());
      room.events.forEach(async (event: any) => {
        if (event.type === 'statschange' && !event.consumables) {
          event.consumables = {
            coins: 0,
            keys: 0,
            bombs: 0,
            blueFriends: 0,

            goldenKey: false,
            goldenBomb: false,
          };
        }
      });

      fancyLog(
        'log',
        'ProjectMigration',
        [`Saving ${room.id} to rooms`, room],
        '#FF9800'
      );

      await file.writeAllText(JSON.stringify(room));
    });

    await asyncWait(100);
  },

  /**
   * v5: Remove bosses
   */
  5: async (fs: IBaseFS) => {
    await fs.deleteDirectory('bosses');
    await asyncWait(100);
  },

  /**
   * v6: Upgrade classes and rename asset directory
   */
  6: async (fs: IBaseFS) => {
    await upgradeFileds(fs);
    const assetsDir = await fs.getDirectory('assets');
    const index = await assetsDir.getFile('index.json');
    const indexData = JSON.parse(await index.readAllText());
    const mappedIndexData = indexData.map((f: any) => {
      let newType = null;
      switch (f.type) {
        case 'image':
          newType = 'gfx';
          break;
        case 'audio':
          newType = 'sfx';
          break;
        case 'video':
          newType = 'videos';
          break;
        case 'font':
          newType = 'fonts';
          break;
        case 'script':
          newType = 'scripts';
          break;
        case 'other':
          newType = 'others';
          break;
      }

      return {
        ...f,
        ...(newType ? { type: newType } : undefined),
      };
    });

    index.writeAllText(JSON.stringify(mappedIndexData));

    try {
      (await assetsDir.getDirectory('image')).rename('gfx');
      (await assetsDir.getDirectory('audio')).rename('sfx');
      (await assetsDir.getDirectory('video')).rename('videos');
      (await assetsDir.getDirectory('font')).rename('fonts');
      (await assetsDir.getDirectory('script')).rename('scripts');
      (await assetsDir.getDirectory('other')).rename('others');
    } catch {
      fancyLog(
        'error',
        'ProjectMigration',
        `Can't rename directories in ./assets`,
        '#FF9800'
      );
    }
  },
};
