export const restoreMap = (x: Record<string, any>): unknown =>
  new Map(
    Object.keys(x).map((y) => [
      y,
      typeof x[y] == "object" && !Array.isArray(x[y]) ? restoreMap(x[y]) : x[y],
    ])
  );
