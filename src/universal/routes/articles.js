import LandingContainer from 'universal/modules/landing/containers/Landing/LandingContainer';
import ArticlesContainer from 'universal/modules/Articles/containers/ArticlesContainer.js';

export default {
  path: 'articles',
  component: LandingContainer,
  indexRoute: {
    component: ArticlesContainer
  },
  childRoutes: []
};
