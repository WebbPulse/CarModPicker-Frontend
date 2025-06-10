import React from 'react';

interface ProfileInfoItemProps {
  label: string;
  children: React.ReactNode; // Content for the value (can be text or other components)
  className?: string;
}

const ProfileInfoItem: React.FC<ProfileInfoItemProps> = ({
  label,
  children,
  className = '',
}) => {
  return (
    <div className={className}>
      <p className="font-medium text-gray-300">{label}:</p>
      <div className="text-gray-300">{children}</div>
    </div>
  );
};

export default ProfileInfoItem;
