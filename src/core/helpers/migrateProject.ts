import { useEditorStore } from "@/store/editor";
import { Room } from "../classes/game/Room";
import { restoreMap } from "./restoreMap";
import IBaseFS from "@/utils/uniFS/IBaseFS";
import { restoreClass } from "./restoreClass";
import { asyncWait } from "./asyncWait";

let editor: ReturnType<typeof useEditorStore>;

/**
 * Запуск миграции проекта
 * @param from - номер текущей версии проекта
 * @param to - номер целевой версии проекта
 * @param fs - файловая система проекта
 */
export async function runMigration(from: number, to: number, fs: IBaseFS) {
  editor = useEditorStore();
  log("log", `Migrate project from v${from} to v${to}`);
  alert(
    "Current project version is outdated. Please wait while we migrate your project to the latest version."
  );
  for (let i = from + 1; i <= to; i++) {
    const migration = migrations[i];
    if (migration) {
      try {
        await migration(fs);
      } catch (e) {
        console.error(e);
        alert("Migration failed. Please report this error to the developer.");
        return;
      }
    }
  }

  await (
    await fs.getFile("project.json")
  ).writeAllText(
    JSON.stringify({
      name: editor.name,
      uuid: editor.uuid,
      version: to,
    })
  );

  await asyncWait(1000);
  alert("Migration complete!");
}

/** Хранилище методов для миграции проекта */
const migrations: { [key: number]: any } = {
  /**
   * v2: Node coordinates now stored in RoomEvent.pos,
   * eventNodes.json deprecated
   */
  2: async (fs: IBaseFS) => {
    const roomDir = await fs.getDirectory("rooms");
    const rooms: Room[] = [];

    (await roomDir.getFiles()).forEach(async (file) => {
      rooms.push(restoreClass<Room>(await file.readAllText(), Room));
    });

    await asyncWait(1000);

    const eventNodes = restoreMap(
      JSON.parse(await (await fs.getFile("eventNodes.json")).readAllText())
    ) as Map<string, Map<string, number[]>>;

    const dir = await fs.getDirectory("rooms");

    rooms.forEach(async (room) => {
      room.events.forEach((event) => {
        const node = eventNodes.get(room.id)?.get(event.id);
        if (node) {
          event.pos = { x: Math.round(node[0]), y: Math.round(node[1]) };
        }
      });

      const file = await dir.createFile(`${room.id}.json`);
      log("log", `Saving ${room.id} to rooms`, room);

      await file.writeAllText(JSON.stringify(room));
    });

    await fs.deleteFile("eventNodes.json");
    await asyncWait(100);
  },

  /**
   * v3: StatCheck event now have consumables check
   * Or event now have counter and fail output
   * Select event now have requirments
   */
  3: async (fs: IBaseFS) => {
    const dir = await fs.getDirectory("rooms");
    const files = await dir.getFiles();

    files.forEach(async (file) => {
      const room = JSON.parse(await file.readAllText());
      room.events.forEach(async (event: any) => {
        if (event.type === "statscheck" && !event.requiredConsumables) {
          event.requiredConsumables = {
            coins: {
              type: "number",
              enabled: false,
              from: 0,
              to: 0,
            },
            keys: {
              type: "number",
              enabled: false,
              from: 0,
              to: 0,
            },

            bombs: {
              type: "number",
              enabled: false,
              from: 0,
              to: 0,
            },

            blueFriends: {
              type: "number",
              enabled: false,
              from: 0,
              to: 0,
            },

            goldenKey: {
              type: "boolean",
              enabled: false,
              value: false,
            },

            goldenBomb: {
              type: "boolean",
              enabled: false,
              value: false,
            },
          };

          delete event.requiredStats?.redHearts;
          delete event.requiredStats?.blueHearts;
          delete event.requiredStats?.blackHearts;
          delete event.requiredStats?.goldenHearts;
          delete event.requiredStats?.whiteHearts;
        } else if (event.type === "or") {
          if (!event.outputEvents["fail"]) {
            event.outputEvents["fail"] = "00000000-0000-0000-0000-000000000000";
          }

          if (!event.counterChecksMode) {
            event.counterEnabled = false;
            event.counterChecksMode = "success";
            event.counterLabel = "";
          }
        } else if (event.type === "select") {
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
              damageType: "default",
              damageTags: [],
            };
          });
        }
      });

      log("log", `Saving ${room.id} to rooms`, room);

      await file.writeAllText(JSON.stringify(room));
    });

    await asyncWait(100);
  },
};

const log = (type: "log" | "warn" | "error", ...args: any[]) => {
  console[type](
    "%cProjectMigration",
    "background-color: #FF9800; color: #333; border-radius: 100px;padding: 1px 4px",
    ...args
  );
};
