import React, {Component, PropTypes} from 'react';
import styles from './Articles.css';

export default class Articles extends Component {
  static propTypes = {
    articles: PropTypes.array
  }
  render() {
    let template = this.props.articles.map((article, idx) => {
      return (
        <div key={idx}>
          <h3>Title: {article.title} {idx}</h3>
          <h4>Headline: {article.headline}</h4>
          <p>{article.body}</p>
        </div>
    );
    });
    return (
      <div className={styles._container}>
        <h2>Made it to articles.</h2>
        {template}
      </div>
    );
  }
}
