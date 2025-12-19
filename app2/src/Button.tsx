import React from 'react';

import { Button as MuiButton } from '@mui/material';

type ButtonProps = {
  size: 'small' | 'large' | 'huge';
};
const Button: React.FC<ButtonProps> = ({ size }) => {
  if (size === 'large') {
    return (
      <button
        type="button"
        onClick={() => {
          alert('clicked large');
        }}
      >
        App2 Large Button
      </button>
    );
  }
  return <MuiButton>Small Button</MuiButton>;
};

export default Button;
