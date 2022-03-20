import { ConsumablePool } from "@/core/types/game/ConsumablePool";
import { SpriteSource } from "@/core/types/gfx/SpriteSource";
import { LocaleText } from "../base/LocaleText";

/** Класс для пилюлль */
export class ConsumablePill {

    /** Эффект пилюли */
    effect: ;

    /** Открыта-ли пилюля */
    isOpen: boolean = false;

    /** Спрайт пилюли */

    /** Название пилюли */
    name: LocaleText = null;

    /** Пул пилюли */
    pool: ConsumablePool = ConsumablePool.ROOMCLEAN;

    onPickup?: Nullable<() => void> = null;
    onRoomChange?: Nullable<() => void> = null;

}