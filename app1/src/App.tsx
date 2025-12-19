import React from 'react';

import { Button as MuiButton } from '@mui/material';

import RemoteButton from 'app2/Button';

const App = () => (
  <div>
    <h1>Typescript</h1>
    <h2>App 1</h2>
    {/* <React.Suspense fallback="Loading Button"> */}
    <MuiButton>Local Button</MuiButton>

    <RemoteButton size="large" />
    <br />
    <RemoteButton size="small" />
    {/* </React.Suspense> */}
  </div>
);

export default App;
