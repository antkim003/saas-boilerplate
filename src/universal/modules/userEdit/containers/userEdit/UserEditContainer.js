import React, {Component} from 'react';
import UserEdit from '../../components/userEdit/userEdit';
// import {getUsers} from '../../ducks/users.js';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {ensureState} from 'redux-optimistic-ui';

@connect(mapStateToProps, mapDispatchToProps)
export default class UserEditContainer extends Component {
  constructor(props) {
    super(props);
    const {dispatch} = props;
    // dispatch(getUsers());
  }
  render() {
    return <UserEdit {...this.props}/>;
  }
}

function mapStateToProps(state) {
  state = ensureState(state);
  return {
    users: state.get('userEdit').toJS().user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getArticles: bindActionCreators({...getUsers}, dispatch),
    dispatch
  };
}
