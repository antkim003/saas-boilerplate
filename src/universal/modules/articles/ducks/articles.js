import {fromJS, Map as iMap, List as iList} from 'immutable';
import {push, replace} from 'react-router-redux';
import {ensureState} from 'redux-optimistic-ui';
import fetch from 'isomorphic-fetch';

import {parseJSON, hostUrl, fetchGraphQL} from '../../../utils/fetching';
import socketOptions from '../../../utils/socketOptions';
import validateSecretToken from '../../../utils/validateSecretToken';

const {authTokenName} = socketOptions;

export const GET_ARTICLES = 'GET_ARTICLES';

const initialState = iMap({
  synced: false,
  error: null,
  data: iList()
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ARTICLES:
      const {doc: addDoc} = action.payload.variables;
      return state.merge({
        synced: action.meta && action.meta.synced || false,
        data: state.get('data').push(fromJS(addDoc))
      });
    default:
      return state;
  }
}

const articleSchema = `
  {
    title
    headline
    body
  }`;

export const getArticles = (dispatch, variables, redirect) => {
    return async(dispatch, getState) => {
      const query = `
          query {
            getAllArticlesBy
            ${articleSchema}
          }`;
      const {error, data} = await fetchGraphQL({query});
      if (error) {
        debugger;
      } else {
        const {payload} = data;

      }
    }
}
