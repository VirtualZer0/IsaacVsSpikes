import seedrandom from 'seedrandom';

type TLogType = 'error' | 'warn' | 'log';
const consoleStyle =
  'background-color: {bg}; color: #FFFFFF; border-radius: 100px;padding: 1px 4px;';

const getColor = (tag: string) => {
  const rng = seedrandom(tag);
  const h = rng() * 360;
  const s = 0.8;
  const l = 0.8;
  return `hsl(${h}, ${s * 100}%, ${l * 100}%)`;
};

export const fancyLog = (
  type: TLogType,
  title: string,
  args: any[] | any,
  color: string | null = null
) => {
  const style = consoleStyle.replace('{bg}', color ?? getColor(title));
  // eslint-disable-next-line no-console
  console[type](
    `%c${title}%c`,
    style,
    '',
    ...(Array.isArray(args) ? [...args] : [args])
  );
};
