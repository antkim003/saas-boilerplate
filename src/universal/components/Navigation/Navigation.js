import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import React, {PropTypes, Component} from 'react';
import styles from './Navigation.css';
import {Link} from 'react-router';
import logo from './../Navigation/logo.png';

export default class Navigation extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  };

  render() {
    return (
      <Paper zDepth={3} className={styles.nav}>
        <Link to="/" className={styles.brand}>
          <img src={logo} height="38" alt="Macys Logo"/>
          <span> CMS</span>
        </Link>
        <div className={styles.menuButtons}>
          <Link className={styles.buttonBuffer} to="/cms">
            <FlatButton className={styles.menuButton} label="CMS"/>
          </Link>

          <span className="spacer"> | </span>
          {this.props.isAuthenticated ? this.renderLoggedIn() : this.renderLoggedOut()}
        </div>
      </Paper>
    );
  }

  renderLoggedIn() {
    return (
      <Link className={styles.buttonBuffer} to="/logout">
        <FlatButton className={styles.menuButton} label="Logout"/>
      </Link>
    );
  }

  renderLoggedOut() {
    return (
      <span>
        <Link className={styles.buttonBuffer} to="/login">
          <FlatButton className={styles.menuButton} label="Login"/>
        </Link>
      </span>
    );
  }
}
