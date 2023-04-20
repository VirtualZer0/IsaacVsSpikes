export const fitAspectRatio = (
  block1Width: number,
  block1Height: number,
  block2Width: number,
  block2Height: number
) => {
  const widthRatio = block1Width / block2Width;
  const heightRatio = block1Height / block2Height;
  const scalingFactor = Math.max(widthRatio, heightRatio);

  if (widthRatio > heightRatio) {
    return {
      width: block2Width,
      height: block1Height / widthRatio,
      scalingFactor,
    };
  } else {
    return {
      width: block1Width / heightRatio,
      height: block2Height,
      scalingFactor,
    };
  }
};
