import React from 'react';
import './test.css';
type ButtonProps = {
    size: 'small' | 'large' | 'huge';
};
declare const Button: React.FC<ButtonProps>;
export default Button;
