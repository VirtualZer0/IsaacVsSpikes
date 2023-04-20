const smartGridCells = {
  1008: { scale: 1, x: [245, 732, 1172, 1684] },
  868: { scale: 0.75, x: [383, 768, 1134, 1533] },
  752: { scale: 0.5, x: [230, 558, 828, 1068, 1347, 1686] },
  691: { scale: 0.25, x: [424, 650, 861, 1057, 1263, 1494] },
} as { [key: number]: { scale: number; x: number[] } };

export const getNearestSmartGridCell = (x: number, y: number) => {
  const nearY: number = Object.keys(smartGridCells)
    .map((y) => parseInt(y))
    .reduce((a, b) => (Math.abs(b - y) < Math.abs(a - y) ? b : a));

  const nearX: number = smartGridCells[nearY].x.reduce((a, b) =>
    Math.abs(b - x) < Math.abs(a - x) ? b : a
  );

  return { x: nearX, y: nearY, scale: smartGridCells[nearY].scale };
};

export const getCellScale = (y: number) => {
  const nearY: number = Object.keys(smartGridCells)
    .map((y) => parseInt(y))
    .reduce((a, b) => (Math.abs(b - y) < Math.abs(a - y) ? b : a));

  return smartGridCells[nearY].scale;
};
