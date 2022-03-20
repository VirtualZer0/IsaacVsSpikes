import { ConsumablePool } from "@/core/types/game/ConsumablePool";
import { SpriteSource } from "@/core/types/gfx/SpriteSource";
import { LocaleText } from "../base/LocaleText";

/** Класс для карт/рун */
export class ConsumablePassive {

    /** Открыт-ли расходник */
    isOpen: boolean = false;

    /** Спрайт расходника */
    sprite: SpriteSource | null = null;

    /** Название расходника */
    name: LocaleText = null;

    /** Пул расходника */
    pool: ConsumablePool = ConsumablePool.ROOMCLEAN;

    onPickup?: Nullable<() => void> = null;
    onRoomChange?: Nullable<() => void> = null;

}