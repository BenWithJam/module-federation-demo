import React from 'react';

type ButtonProps = {
  size: 'small' | 'large' | 'huge'
};
const Button: React.FC<ButtonProps> = ({ size }) => {
  if (size === 'large') {
    return <button onClick={() => {
      alert('clicked large')
    }}>App2 Large Button</button>;
  }
  return <button>App 2 Small Button 123</button>;
};

export default Button;
