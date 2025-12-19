import React from 'react';

import { UiButton } from '@library/Button';
import { Button as MuiButton } from '@mui/material';

import './test.css';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: blue;
`;

type ButtonProps = {
  size: 'small' | 'large' | 'huge';
};
const Button: React.FC<ButtonProps> = ({ size }) => {
  if (size === 'large') {
    return (
      <StyledButton
        className="button"
        type="button"
        onClick={() => {
          alert('clicked large');
        }}
      >
        App2 Large Button
      </StyledButton>
    );
  }
  return (
    <>
      <MuiButton>Small Button</MuiButton>
      <UiButton label="from UI package" />
    </>
  );
};

export default Button;
