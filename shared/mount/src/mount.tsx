import React, { type ReactNode } from 'react';
import { QueryClient } from '@tanstack/react-query';

import { ErrorBoundary } from './boundary';

import { createRoot } from 'react-dom/client';

interface IMountOptions {
  queryClient?: QueryClient;
  fallback?: React.ReactNode;
  hostStyles?: {
    // background?: TTheme['host']['background'];
    background?: unknown;
    // width?: TTheme['host']['width'];
    width?: unknown;
  };
}

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

export const mount = (
  parentId: string,
  { queryClient, fallback, hostStyles }: IMountOptions | undefined = {},
) => {
  // console.log('utils/mount.ts: mount function called 123');

  const shadowRoot = getShadowRoot(parentId);

  const root = createRoot(shadowRoot);

  const client =
    queryClient ??
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: false,
          staleTime: 60000,
        },
      },
    });

  // const shadowrootCache = createCache({
  //   key: 'emotion',
  //   container: shadowRoot,
  //   prepend: true,
  // });

  return {
    render: (children: ReactNode) => {
      root.render(
        <>
          <React.Suspense fallback={<span>Loading...</span>}>
            <ErrorBoundary fallback={fallback}>
              {/* <QueryClientProvider client={client}> */}
              <span>Hello from Mount</span>
              {children}
              {/* </QueryClientProvider> */}
            </ErrorBoundary>
          </React.Suspense>
        </>,
      );
    },
    unmount: () => {
      root.render(null);
    },
    destroy: () => {
      root.unmount();
    },
  };
};
