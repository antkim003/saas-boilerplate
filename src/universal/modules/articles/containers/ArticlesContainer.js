import React, {Component} from 'react';
import Articles from '../components/Articles';
// import styles from './Articles.css';
// import {connect} from 'react-redux';
// import {ensureState} from 'redux-optimistic-ui';
// @connect(mapStateToProps)
export default class ArticleContainer extends Component {
  render() {
    return (
      <div>
        <Articles/>
      </div>
    );
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
