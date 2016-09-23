// import React from 'react';
import React, {Component, PropTypes} from 'react';
import {Dialog, FlatButton, TextField, Divider} from 'material-ui';
// import FlatButton from 'material-ui/FlatButton';
const ReactDOM = require('react-dom');
// import TextField from 'material-ui/TextField';
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
    name: this.props.user.name,
    email: this.props.user.email,
    usertype: this.props.user.usertype,
    password: '***********************',
    passwordCheck: '***********************',
    usertypes: ['admin', 'developer', 'consumer']
  };

  handleChange = event => {
    const lineKey = event.target.id;
    this.setState({
      [lineKey]: event.target.value
    });
    console.log('this.state.name', this.state.name);
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleSubmit = () => {
    // for will be handled here.
    this.setState({open: false});
    console.log('this.state.name from submit', this.state.name);
    // console.log('this.state.email from submit', this.state.email);
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
          <div>
            <TextField
              floatingLabelText="Name"
              id="name"
              value={this.state.name}
              onChange={this.handleChange}
              name="Name"
              />
            <Divider/>
            <TextField
              floatingLabelText="Email"
              id="email"
              value={this.state.email}
              onChange={this.handleChange}
              />
            <Divider/>
            <TextField
              floatingLabelText="User Type"
              id="usertype"
              value={this.state.usertype}
              onChange={this.handleChange}
              />
            <Divider/>
            <TextField
              floatingLabelText="Enter New Password"
              id="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <Divider/>
            <TextField
              floatingLabelText="Confirm New Password"
              id="password"
              value={this.state.passwordCheck}
              onChange={this.handleChange}
            />
          </div>
        </Dialog>
      </div>
    );
  }
}
