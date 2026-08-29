import React from 'react';

export function BrandLink(){
  return (
    <a href="/" className="brandLink" aria-label="Ross PDF Editor home" title="Ross PDF Editor — Home">
      <img src="/assets/ross-pdf-editor-mark.svg" alt="Ross PDF Editor" className="brandMark" />
      <span className="brandWordmark"><strong>ROSS</strong> <span>PDF</span> <b>EDITOR</b><small>UNIVERSAL DOCUMENT ENGINE</small></span>
    </a>
  );
}
