import React from 'react';

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
  return <button type="button">App 2 Small Button</button>;
};

export default Button;
