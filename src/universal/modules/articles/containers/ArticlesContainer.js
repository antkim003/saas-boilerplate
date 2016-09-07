import React, {Component, PropTypes} from 'react';
import Articles from '../components/Articles';
// import styles from './Articles.css';
import {connect} from 'react-redux';
import {ensureState} from 'redux-optimistic-ui';
import {getArticles} from '../ducks/ArticlesDucks';

@connect(mapStateToProps)
export default class ArticleContainer extends Component {

  static propTypes = {
    articles: PropTypes.array
  }

  render() {
    return (
      <div>
        <Articles articles={this.props.articles}/>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  state = ensureState(state);
  const articles = state.get('articles');
  return {
    articles: articles
  };
}
