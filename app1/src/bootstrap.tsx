import React from 'react';

// import { mount } from 'mount';

import App from './App';

// const { render } = mount('root');

// render(<App />);

import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container as any);
root.render(<App />);
