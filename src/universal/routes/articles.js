import LandingContainer from 'universal/modules/landing/containers/Landing/LandingContainer';
import ArticleContainer from 'universal/modules/articles/containers/article/ArticleContainer';
import makeReducer from 'universal/redux/makeReducer';
import {resolvePromiseMap} from 'universal/utils/promises';

export default function (store) {
  return {
    path: 'articles',
    component: LandingContainer,
    getIndexRoute: async (location, cb) => {
      const promiseMap = setImports();
      const importMap = await resolvePromiseMap(promiseMap);
      const {optimistic, ...asyncReducers} = getImports(importMap);
      const component = ArticleContainer;
      const newReducer = makeReducer(asyncReducers, optimistic);
      store.replaceReducer(newReducer);
      console.log('store here: ', store);
      cb(null, {component});
    }
  };
}

function setImports() {
  return new Map([
    ['optimistic', System.import('redux-optimistic-ui')],
    ['articles', System.import('universal/modules/articles/ducks/articles')]
  ]);
}

function getImports(importMap) {
  return {
    optimistic: importMap.get('optimistic').optimistic,
    articles: importMap.get('articles').reducer
  };
}
