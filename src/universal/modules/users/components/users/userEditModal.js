// import React from 'react';
import React, {Component, PropTypes} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
const ReactDOM = require('react-dom');
// import RaisedButton from 'material-ui/RaisedButton';
import {Button, FormControl, FormGroup, ControlLabel} from 'react-bootstrap';
/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class UserEditModal extends Component {
  static propTypes = {
    user: PropTypes.object
  }
  state = {
    open: false,
    user: this.props.user
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleSubmit = () => {
    // for will be handled here.
    // console.log('this.refs.name', this.refs.name.getInputDOMNode());
    // console.log('this.refs.name', this.refs.name.getValue());
    console.log('this.refs.name', this.refs.valueOf());
    this.setState({open: false});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        onTouchTap={this.handleSubmit}
      />
    ];

    return (
      <div>
        <Button bsStyle="info" bsSize="xsmall" onTouchTap={this.handleOpen}>Edit</Button>
        <Dialog
          title="Edit User"
          autoDetectWindowHeight={false}
          autoScrollBodyContent={false}
          contentStyle={{width: "100%", maxHeight: "none"}}
          actions={actions} open={this.state.open} >
          <form>
            <FormGroup>
              <ControlLabel>Name</ControlLabel>
              <FormControl
                id="formName"
                type="text"
                label="Name"
                ref="name"
                placeholder={this.props.user.name}
              />
              <ControlLabel>Email</ControlLabel>
              <FormControl
                id="formEmail"
                type="text"
                label="Email"
                placeholder={this.props.user.email}
              />
            <ControlLabel>Password</ControlLabel>
              <FormControl
                id="formPassword"
                type="text"
                label="Password"
                placeholder="Enter new password"
              />
            <ControlLabel>User Type</ControlLabel>
              <FormControl
                id="formUserType"
                type="text"
                label="User Type"
                placeholder={this.props.user.usertype}
              />
            </FormGroup>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Select</ControlLabel>
              <FormControl componentClass="select" placeholder="select">
                <option value="select">Admin</option>
                <option value="other">End User</option>
              </FormControl>
            </FormGroup>
          </form>
        </Dialog>
      </div>
    );
  }
}
