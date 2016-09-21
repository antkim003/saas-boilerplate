import React, {Component, PropTypes} from 'react';
import styles from './Users.css';
import {Row, Col, Grid, Table, Button} from 'react-bootstrap';

export default class Users extends Component {
  static propTypes = {
    users: PropTypes.array
  }
  render() {
    let template = this.props.users.map((user, idx) => {
      return (
        <tr key={idx}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{processPermissions(user.permissions)}</td>
          <td>{user.usertype}</td>
          <td><Button bsStyle="info" bsSize="xsmall">Deactivate</Button></td>
        </tr>
    );
    });
    return (
      <div className={styles._container}>
        <Button bsStyle="info">Add User</Button>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Permissions</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {template}
          </tbody>
        </Table>
      </div>
    );
  }
}

const parsePermission = permission => {return permission.charAt(0).toUpperCase();};

function processPermissions (permissions) {
  let res = '';
  for (let i = 0; i < permissions.length; i++) {
    res += parsePermission(permissions[i]);
    if (i < permissions.length - 1) {
      res += ', ';
    }
  }
  return res;
};
