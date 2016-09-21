import React, {Component, PropTypes} from 'react';
import styles from './Users.css';
// import {Row, Col, Grid, Table, Button} from 'react-bootstrap';

export default class UserEdit extends Component {
  static propTypes = {
    users: PropTypes.array
  }
  render() {
    return (
      <div className={styles._container}>
        <h1>Made it to Edit User</h1>
      </div>
    );
  }
}
