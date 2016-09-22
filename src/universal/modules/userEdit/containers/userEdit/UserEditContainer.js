import React, {Component} from 'react';
import UserEdit from '../../components/userEdit/userEdit';
import {getUser} from '../../ducks/userEdit.js';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {ensureState} from 'redux-optimistic-ui';

@connect(mapStateToProps, mapDispatchToProps)
export default class UserEditContainer extends Component {
  constructor(props) {
    super(props);
    const {dispatch} = props;
    dispatch(getUser(1));
  }
  render() {
    return <UserEdit {...this.props}/>;
  }
}

function mapStateToProps(state) {
  state = ensureState(state);
  return {
    userEdit: state.get('userEdit').toJS().userEdit
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUser: bindActionCreators({...getUser}, dispatch),
    dispatch
  };
}
