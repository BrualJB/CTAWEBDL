import React from 'react';
import articles from '../../article-content'; // Adjust path if needed
import { Link } from 'react-router-dom';

function ArticleList() {
  return (
    <div className="article-list-container">
      <h1>Articles</h1>
      {articles.map((article) => (
        <div className="article-preview" key={article.name}>
          <h2>
            <Link to={`/articles/${article.name}`}>{article.title}</Link>
          </h2>
          <p>
            {Array.isArray(article.content) && typeof article.content[0] === 'string'
              ? article.content[0].substring(0, 100) + '...'
              : 'No preview available.'}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ArticleList;
