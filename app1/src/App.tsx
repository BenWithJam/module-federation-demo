import React from 'react';

const RemoteButton = React.lazy(() =>
  import('app2/Button').catch((e) => {
    console.error('Error loading remote Button:', e);
    return {
      default: () => <button>Failed to load Button</button>,
    };
  }),
);

// import RemoteButton from 'app2/Button';

console.log(RemoteButton);

const App = () => (
  <div>
    <h1>Typescript</h1>
    <h2>App 1</h2>

    <React.Suspense fallback="Loading Button">
      <RemoteButton size="large" />
      <br />
      {/* <RemoteButton size="small" /> */}
    </React.Suspense>
  </div>
);

export default App;
