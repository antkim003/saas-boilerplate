import LandingContainer from 'universal/modules/landing/containers/Landing/LandingContainer';
import ArticleContainer from 'universal/modules/articles/containers/article/ArticleContainer';

export default {
  path: 'articles',
  component: LandingContainer,
  indexRoute: {
    component: ArticleContainer
  },
  childRoutes: []
};
