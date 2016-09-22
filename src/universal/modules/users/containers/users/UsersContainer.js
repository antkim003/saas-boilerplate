import React, {Component} from 'react';
import Users from '../../components/users/users';
import {getUsers} from '../../ducks/users.js';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {ensureState} from 'redux-optimistic-ui';

@connect(mapStateToProps, mapDispatchToProps)
export default class UsersContainer extends Component {
  constructor(props) {
    super(props);
    const {dispatch} = props;
    dispatch(getUsers());
  }
  render() {
    return <Users {...this.props}/>;
  }
}

function mapStateToProps(state) {
  state = ensureState(state);
  return {
    users: state.get('users').toJS().users
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}
