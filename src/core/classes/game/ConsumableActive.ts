import { ConsumablePool } from "@/core/types/game/ConsumablePool";
import { SpriteSource } from "@/core/types/gfx/SpriteSource";
import { LocaleText } from "../base/LocaleText";

/** Класс для монеток/бомб/ключей и их вариаций */
export class ConsumableActive {

    /** Эффект карты/руны */
    effect: ;

    /** Открыта-ли карта/руна */
    isOpen: boolean = false;

    /** Спрайт карты/руны */
    sprite: SpriteSource | null = null;

    /** Название карты/руны */
    name: LocaleText = null;

    /** Пул карты/руны */
    pool: ConsumablePool = ConsumablePool.ROOMCLEAN;

    onPickup?: Nullable<() => void> = null;
    onRoomChange?: Nullable<() => void> = null;

}