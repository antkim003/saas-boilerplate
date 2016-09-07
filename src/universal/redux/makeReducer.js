import {reducer as form} from 'redux-form';
import {compose} from 'redux';
import {combineReducers} from 'redux-immutablejs';
import auth from '../modules/auth/ducks/auth';
// import articles from '../modules/articles/ducks/ArticlesDucks';

import {routing} from './routing';

const currentReducers = {
  auth,
  routing,
  form
  // articles
};

export default (newReducers, reducerEnhancers) => {
  Object.assign(currentReducers, newReducers);
  const reducer = combineReducers({...currentReducers});
  if (reducerEnhancers) {
    return Array.isArray(reducerEnhancers) ? compose(...reducerEnhancers)(reducer) : reducerEnhancers(reducer);
  }
  return reducer;
};
