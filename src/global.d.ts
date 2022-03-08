type Nullable<T> = T | null;
type GameWindow = Window & typeof globalThis & {core: Core};