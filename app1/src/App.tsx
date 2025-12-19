import React from 'react';
import styled from 'styled-components';

import { UiButton } from '@library/Button';
import { Button as MuiButton } from '@mui/material';

// import RemoteButton from 'app2/Button';

const RemoteButton = React.lazy(() => import('app2/Button'));

const StyledHeading = styled.h2`
  color: blue;
`;

const App = () => (
  <div>
    <h1>Typescript</h1>
    <StyledHeading>App 1</StyledHeading>
    <UiButton label="from UI package in app1" />
    <React.Suspense fallback="Loading Button">
      <MuiButton>Local Button</MuiButton>

      <RemoteButton size="large" />
      <br />
      <RemoteButton size="small" />
    </React.Suspense>
  </div>
);

export default App;
