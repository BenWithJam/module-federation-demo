import React from 'react';

type ButtonProps = {
  size: 'small' | 'large' | 'verylarge';
  label: string;
};
const Button: React.FC<ButtonProps> = ({ size, label }) => {
  if (size === 'large') {
    return (
      <button
        type="button"
        onClick={() => {
          alert('clicked large');
        }}
      >
        App2 {label}
      </button>
    );
  }
  return <button type="button">App 2 Small Button</button>;
};

export default Button;
