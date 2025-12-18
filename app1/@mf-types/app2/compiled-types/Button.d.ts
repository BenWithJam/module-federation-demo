import React from 'react';
type ButtonProps = {
    size: 'small' | 'large' | 'verylarge';
    label: string;
};
declare const Button: React.FC<ButtonProps>;
export default Button;
