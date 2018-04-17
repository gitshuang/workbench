import { get } from '@u';


export const getSearchSuggest = (
  keywords
) => {
  return get('/fullText/suggest', { keywords });
}
export const getSearchMore = (
  keywords
) => {
  const data = {
    keywords: encodeURI(encodeURI(keywords)),
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
    keywords:keywords,
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
    keywords:keywords,
    contentsize:contentsize,
    page:page,
    size:size
   });
}

