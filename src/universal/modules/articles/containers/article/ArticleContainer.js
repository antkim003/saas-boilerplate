import React, {Component} from 'react';
import Articles from '../../components/article/Articles';
import {getArticles} from '../../ducks/articles.js';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {ensureState} from 'redux-optimistic-ui';

// use the same form to retain form values (there's really no difference between login and signup, it's just for show)
@connect(mapStateToProps, mapDispatchToProps)
export default class ArticleContainer extends Component {
  constructor(props) {
    super(props);
    const {dispatch} = props;
    dispatch(getArticles());
  }
  render() {
    return <Articles {...this.props}/>;
  }
}

function mapStateToProps(state) {
  state = ensureState(state);
  return {
    articles: state.get('articles').toJS().data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getArticles: bindActionCreators({...getArticles}, dispatch),
    dispatch
  };
}
