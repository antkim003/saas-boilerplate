import React, {Component, PropTypes} from 'react';
import styles from './Users.css';
import {Table, Button} from 'react-bootstrap';
import UserEditModal from './userEditModal.js';
import UserCreateModal from './userCreateModal.js';
import {deleteUser} from '../../ducks/users.js';

export default class Users extends Component {
  static propTypes = {
    users: PropTypes.array,
    usertypes: PropTypes.array,
    dispatch: PropTypes.func
  }
  // editHandler = (user, event) => {
  //   event.preventDefault();
  //   event.stopPropagation();
  // }
  handleDelete = (id) => {
    this.props.dispatch(deleteUser(id));
  };
  render() {
    // sort users by id
    const self = this;
    const users = this.props.users.sort((a, b) => {
      return parseFloat(a.id) - parseFloat(b.id);
    });
    // templatize the users to be placed in Component
    let template = users.map((user, idx) => {
      return (
        <tr key={idx}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{processPermissions(user.permissions)}</td>
          <td>{user.usertype}</td>
          <td><UserEditModal user={user} usertypes={self.props.usertypes} dispatch={self.props.dispatch}/></td>
          <td>
            <Button bsStyle="danger" bsSize="xsmall" onClick={self.handleDelete.bind(self, user.id)}>Delete</Button>
          </td>
        </tr>
    );
    });
    const usertypes = self.props.usertypes;
    return (
      <div className={styles._container}>
        <UserCreateModal usertypes={usertypes} dispatch={self.props.dispatch}/>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Permissions</th>
              <th>Type</th>
              <th></th>
              <th></th>
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
