import React from 'react';

interface ErrorAlertProps {
  message: string | null;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <div className="rounded-md bg-red-900 bg-opacity-50 p-4">
      <div className="flex">
        <div className="ml-3">
          <p className="text-sm font-medium text-red-300">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorAlert;
