import {fetchGraphQL} from '../../../utils/fetching';
import {Map as iMap} from 'immutable';
import {ensureState} from 'redux-optimistic-ui';
export const SET_ARTICLES = 'SET_ARTICLES';

const initialState = iMap({
  error: iMap(),
  articles: []
});

export const getArticles = (dispatch, variables) => {
  // dispatch({type: LOGIN_USER_REQUEST});
  return new Promise(async (resolve, reject) => {
    const query = `
    query{getAllArticles{title}}`;

    const {error, data} = await fetchGraphQL({query, variables});
    if (error) {
      reject(error);
    } else {
      console.log('Wow data inside ducks', data);
      // return data;
      const {payload} = data;
      dispatch(setArticles(payload));
      resolve();
    }
  });
};

export function setArticles(payload) {
  return {
    type: SET_ARTICLES,
    payload
  };
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_ARTICLES:
      return state.merge({
        error: iMap(),
        articles: action.payload
      });
    default:
      return state;
  }
}
