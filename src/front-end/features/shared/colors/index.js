export const COLORS = {
  MAIN: 'main',
  HEADER: 'header',
  TEXT: 'text',
  WHITE: 'white',
  BLACK: 'black',
  ERROR: 'error',
  LINK: 'link',
}

const colors = {
  [COLORS.MAIN]: '6,33,49',
  [COLORS.HEADER]: '18,22,26',
  [COLORS.TEXT]: '9,21,38',
  [COLORS.WHITE]: '250,250,250',
  [COLORS.BLACK]: '5,5,5',
  [COLORS.LINK]: '3,128,206',
  [COLORS.ERROR]: '150, 0, 30',
};

const getColor = (name, transparency = 100, add = 0) => {
  if (!colors[name]) return null;
  const [r, g, b] = colors[name].split(',').map(num => parseInt(num)).map(num => num += add);
  return `rgba(${r}, ${g}, ${b}, ${transparency/100})`;
}

export default getColor;