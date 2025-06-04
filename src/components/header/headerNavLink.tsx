import React from 'react';
import { Link, type LinkProps } from 'react-router-dom';

interface HeaderNavLinkProps extends LinkProps {
  children: React.ReactNode;
  icon?: React.ReactNode; // Add icon prop
}

const HeaderNavLink: React.FC<HeaderNavLinkProps> = ({
  children,
  to,
  icon, // Destructure icon
  ...props
}) => {
  return (
    <Link
      to={to}
      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-sm font-medium flex items-center"
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}{' '}
      {/* Render icon if provided, add margin to the right */}
      {children}
    </Link>
  );
};

export default HeaderNavLink;
