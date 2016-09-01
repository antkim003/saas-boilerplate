import LandingContainer from 'universal/modules/landing/containers/Landing/LandingContainer';
import Articles from 'universal/components/Articles/Articles'

export default {
  path: 'articles',
  component: LandingContainer,
  indexRoute: {
    component: Articles
  },
  childRoutes: []
};
