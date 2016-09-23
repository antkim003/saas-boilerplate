// import React from 'react';
import React, {Component, PropTypes} from 'react';
import {Dialog, FlatButton, TextField} from 'material-ui';
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
    name: this.props.user.name
  };

  handleChange = event => {
    console.log('event.target.id', event.target.id)
    this.setState({
      name: event.target.value
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
          <TextField
            id="name"
            value={this.state.name}
            onChange={this.handleChange}
        />
        </Dialog>
      </div>
    );
  }
}
