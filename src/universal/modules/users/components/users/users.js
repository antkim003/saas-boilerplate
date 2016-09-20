import React, {Component, PropTypes} from 'react';
import styles from './Users.css';

export default class Users extends Component {
  static propTypes = {
    users: PropTypes.array
  }
  render() {
    // let template = <div></div>;
    let template = this.props.users.map((user, idx) => {
      return (
        <div key={idx}>
          <h3>email: {user.email} {idx}</h3>
          <h4>id: {user.id}</h4>
        </div>
    );
    });
    return (
      <div className={styles._container}>
        <h2>Made it to users.</h2>
        {template}
      </div>
    );
  }
}
