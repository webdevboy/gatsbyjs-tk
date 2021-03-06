import React from 'react';

import PostLayout from 'src/components/PostLayouts';

function DestionationArticle({ article }) {
  if(!article) return null;
  return (
    <div className="destionation-sub-navigation__article">
      <div className="destionation-sub-navigation__article__title">{article.title}</div>
      {article.components.contents.map((layout, index) => (
        <PostLayout {...{
          key: index,
          layoutData: layout,
          categories: article.categories,
          updateParallaxState: () => {},
        }} />
      ))}
    </div>
  );
}

export default DestionationArticle;
