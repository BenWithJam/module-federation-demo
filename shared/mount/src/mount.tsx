import React from 'react';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

import { createRoot } from 'react-dom/client';

const getShadowRoot = (parentId: string) => {
  const existingShadow = document.getElementById(parentId)?.shadowRoot;

  if (existingShadow) {
    return existingShadow;
  }

  const existingElement = document.getElementById(parentId);

  if (existingElement) {
    const shadowRoot = existingElement.attachShadow({ mode: 'open' });

    return shadowRoot;
  } else {
    const container = document.createElement('div');
    container.id = parentId;
    document.body.appendChild(container);

    const shadowRoot = container.attachShadow({ mode: 'open' });

    return shadowRoot;
  }
};

export const mount = (parentId: string) => {
  // const existingElement = document.getElementById(parentId);
  const shadowRoot = getShadowRoot(parentId);

  // const root = createRoot(existingElement as HTMLElement);
  const root = createRoot(shadowRoot);

  const shadowrootCache = createCache({
    key: 'emotion',
    container: shadowRoot,
    prepend: true,
  });

  return {
    render: (app: React.ReactNode) => {
      root.render(<CacheProvider value={shadowrootCache}>{app}</CacheProvider>);
    },
  };
};
