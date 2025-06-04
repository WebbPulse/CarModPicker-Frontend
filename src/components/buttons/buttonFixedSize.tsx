import React from 'react';
import { Link, type LinkProps } from 'react-router-dom';

interface ButtonFixedSizeProps extends Omit<LinkProps, 'className'> {
  children: React.ReactNode;
}

const ButtonFixedSize: React.FC<ButtonFixedSizeProps> = ({
  children,
  to,
  ...props
}) => {
  return (
    <Link
      to={to}
      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg text-lg"
      {...props}
    >
      {children}
    </Link>
  );
};

export default ButtonFixedSize;
