import React, {Component} from 'react';
import Articles from '../../components/article/Articles';

// use the same form to retain form values (there's really no difference between login and signup, it's just for show)

export default class ArticleContainer extends Component {
  render() {
    return <Articles/>;
  }
}
