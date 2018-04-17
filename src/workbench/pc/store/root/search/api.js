import { get } from '@u';


export const getSearchSuggest = (
  keywords
) => {
  const data = {
    keywords: encodeURI(keywords)
  };
  return get('/fullText/suggest', data);
}
export const getSearchMore = (
  keywords
) => {
  const data = {
    keywords: encodeURI(keywords),
    size: 10
  };
  return get('/fullText/getMore', data);
}
export const getSearch = (
  keywords,
  type,
  page,
  size
) => {
  return get('/fullText/search', { 
    keywords: encodeURI(keywords),
    type:type,
    page:page,
    size:size
  });
}
export const getSearchOther = (
  keywords,
  contentsize,
  page,
  size,
) => {
  return get('/fullText/getOther', { 
    keywords: encodeURI(keywords),
    contentsize:contentsize,
    page:page,
    size:size
   });
}

