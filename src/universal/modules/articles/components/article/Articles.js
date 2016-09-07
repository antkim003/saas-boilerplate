import React, {Component, PropTypes} from 'react';

export default class Articles extends Component {
  static propTypes = {
    articles: PropTypes.array
  }
  render() {
    let template = this.props.articles.map((article, idx) => {
      return <div key={idx}>title: {article.title} header: {article.header} body: {article.body}</div>;
    });
    return (
      <div>
        <h1>Made it to articles.</h1>
        {template}
      </div>
    );
  }
}
