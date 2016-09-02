import React, {Component} from 'react';
import styles from './Articles.css';
import {getArticles} from '../ducks/ArticlesDucks';
// import {connect} from 'react-redux';
// import {ensureState} from 'redux-optimistic-ui';
// @connect(mapStateToProps)
export default class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {articles: []};
  }
  render() {
    return (
      <div>
        <h1 className={styles.testingOnArticles}>This is the Articles Component</h1>
        <container>
          <button className={styles.myButton} onClick={this.handleClick.bind(this)}>Click Me to load articles</button>
        </container>
      </div>
    );
  } //  end render
  handleClick(e) {
    e.preventDefault();
    getArticles()
    .then(function (articles) {
      console.log('articles in return block', articles);
      this.setState({articles});
      console.log('this.state.articles', this.state.articles);
      return;
    });
  }
}
  // function mapStateToProps(state, props) {
  //   state = ensureState(state);
  //   const articles = state.get('articles');
  //   return {
  //     isAuthenticated: auth.get('isAuthenticated'),
  //     isAuthenticating: auth.get('isAuthenticating'),
  //     authError: auth.get('error').toJS(),
  //     pathname: props.location.pathname
  //   };
  // }
