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
};

const log = (type: "log" | "warn" | "error", ...args: any[]) => {
  console[type](
    "%cProjectMigration",
    "background-color: #FF9800; color: #333; border-radius: 100px;padding: 1px 4px",
    ...args
  );
};
