import React, {Component, PropTypes} from 'react';
import styles from './userEdit.css';
import {Row, Col, Grid, Table, Button} from 'react-bootstrap';

export default class Users extends Component {
  static propTypes = {
    userEdit: PropTypes.object
  }
  render() {
    let userEdit = this.props.userEdit;
    // let template = this.props.userEdit.map((user, idx) => {
    //   return (
    //     <tr key={idx}>
    //       <td>{user.id}</td>
    //       <td>{user.name}</td>
    //       <td>{user.email}</td>
    //       <td>{processPermissions(user.permissions)}</td>
    //       <td>{user.usertype}</td>
    //       <td><Button bsStyle="info" bsSize="xsmall">Deactivate</Button></td>
    //     </tr>
    // );
    // });
    return (
      <div className={styles._container}>
        <h2>Inside User Edit!!</h2>
        <Button bsStyle="info">Save User Edits</Button>
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
            <tr>
              <td>{userEdit.id}</td>
              <td>{userEdit.name}</td>
              <td>{userEdit.email}</td>
              <td>{processPermissions(userEdit.permissions)}</td>
              <td>{userEdit.usertype}</td>
              <td><Button bsStyle="info" bsSize="xsmall">Deactivate</Button></td>
            </tr>

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
