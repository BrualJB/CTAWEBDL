import React from "react";
import { Link } from "react-router-dom";
import "../styles/ArticleList.css";

export default function ArticleList({ articles }) {
    return (
      <div className="article-list">
        {articles.map((article) => (
          <Link key={article.id} to={`/articles/${article.id}`} className="article-link">
            <div className="article-card">
              <h3 className="article-title">{article.title}</h3>
              <p className="article-snippet">{article.content.substring(0, 100)}...</p>
              <p className="article-author">By: {article.author}</p>
              <p className="article-date">{article.date}</p>
            </div>
          </Link>
        ))}
      </div>
    );
  }
  