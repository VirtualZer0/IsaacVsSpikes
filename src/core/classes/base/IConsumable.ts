import { ConsumablePool } from "@/core/types/game/ConsumablePool";
import { SpriteSource } from "@/core/types/gfx/SpriteSource";

export default interface IConsumable {
  /** Открыт ли расходник */
  isOpen: boolean;

  /** Спрайт расходника */
  sprite: Nullable<SpriteSource>;

  /** Пул расходника */
  pool: ConsumablePool;
}