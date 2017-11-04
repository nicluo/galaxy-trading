import grammar from './grammar';

export const getEmptyParams = () => ({
  resources: []
});

export const getDefaultParams = () => ({
  i: 'i',
  v: 'v',
  x: 'x',
  l: 'l',
  c: 'c',
  d: 'd',
  m: 'm',
  resources: []
});

export const generateParseGrammar = (params) => {
  const config = Object.assign(getEmptyParams(), params);
  return grammar(config);
};
