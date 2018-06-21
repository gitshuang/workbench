import { get } from '@u';


export const getSearchSuggest = (keywords) => {
  const data = {
    keywords: encodeURI(keywords),
  };
  return get('/fullText/suggest', data);
};
export const getSearchMore = (keywords) => {
  const data = {
    keywords: encodeURI(keywords),
    size: 10,
  };
  return get('/fullText/getMore', data);
};
export const getSearch = (
  keywords,
  type,
  page,
  size,
) => get('/fullText/search', {
  keywords: encodeURI(keywords),
  type,
  page,
  size,
});
export const getSearchOther = (
  keywords,
  contentsize,
  page,
  size,
) => get('/fullText/getOther', {
  keywords: encodeURI(keywords),
  contentsize,
  page,
  size,
});

