import React from 'react';

import './Quote.scss';

export default function Quote({ credit, quote, theme }) {
  return (
    <section className={`quote ${theme}`}>
      <blockquote>
        <p dangerouslySetInnerHTML={{ __html: `${quote}` }}></p>
      </blockquote>
      {credit && (
        <div className="credit" dangerouslySetInnerHTML={{ __html: credit }} />
      )}
    </section>
  );
}
