import React, {Component} from 'react';
import Projects from '../../components/projects/projects';
import {getAllProjects} from '../../ducks/projects.js';
import {loginToken} from '../../../auth/ducks/auth.js'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {ensureState} from 'redux-optimistic-ui';

@connect(mapStateToProps, mapDispatchToProps)
export default class ProjectsContainer extends Component {
  constructor(props) {
    super(props);
    const {dispatch} = props;
    dispatch(getAllProjects());
  }
  render() {
    return <Projects {...this.props} {...this.props.data} {...this.props.auth}/>;
  }
}

function mapStateToProps(state) {
  state = ensureState(state);
  // console.log('state',state);
  return {
    data: state.get('projects').toJS(),
    auth: state.get('auth').toJS()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}
