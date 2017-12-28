import { get } from '@u';


export const getSearchSuggest = (
  keywords
) => {
  return get('/fullText/suggest', { keywords });
}
export const getSearchMore = (
  keywords
) => {
  return get('/fullText/getMore', { keywords });
}
export const getSearch = (
  keywords,
  type,
  page
) => {
  return get('/fullText/search', { 
    keywords:keywords,
    type:type,
    page:page
  });
}
export const getSearchOther = (
  keywords,
  type,
  page
) => {
  return get('/fullText/getOther', { 
    keywords:keywords,
    type:type,
    page:page
   });
}

