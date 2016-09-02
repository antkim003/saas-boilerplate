import {fetchGraphQL} from '../../../utils/fetching';
import {fromJS, Map as iMap} from 'immutable';
import {ensureState} from 'redux-optimistic-ui';
export const GET_ARTICLES = 'GET_ARTICLES';

const initialState = iMap({
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
      return data;
      // const {payload} = data;
      // dispatch(loginUserSuccess(payload));
      // dispatch(push(redirect));
      // resolve();
    }
  });
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_ARTICLES:
      return state.merge({
        error: iMap(),
        articles: action.payload
      });
    default:
      return state;
  }
}
