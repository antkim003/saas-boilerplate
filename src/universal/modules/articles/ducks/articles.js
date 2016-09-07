import {fromJS, Map as iMap, List as iList} from 'immutable';
import {fetchGraphQL} from '../../../utils/fetching';

export const GET_ARTICLES = 'GET_ARTICLES';
export const ARTICLES = 'articles';

const initialState = iMap({
  data: iList()
});

export function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ARTICLES:
      console.log('action is here: ', action);
      return state.merge({
        data: state.get('data').concat(fromJS(action.payload))
      });
    default:
      return state;
  }
}
export function getArticles() {
  const articleSchema =
  `
    {
      title,
      headline,
      body
    }
  `;
  return async(dispatch, getState) => {
    console.log(getState);
    const query = `
        query {
          getAllArticlesBy
          ${articleSchema}
        }`;
    const {error, data} = await fetchGraphQL({query});
    if (error) {
      console.error(error);
    } else {
      dispatch({
        type: GET_ARTICLES,
        payload: data.getAllArticlesBy
      });
    }
  };
}
