import React, {Component} from 'react';
import {Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './Header.css';

export default class Header extends Component {
  render() {
    return (
      <div className={styles.header}>
        <div className={styles.banner}>
          <h1 className={styles.bannerTitle}>Welcome to Macy's CMS</h1>
          <h3 className={styles.bannerDesc}>Store your projects....</h3>
          <div className={styles.tryButton}>
            <Link to="/users">
              <RaisedButton secondary label="Users"/>
            </Link>
            <Link to="/projects">
              <RaisedButton secondary label="Projects"/>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
