import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import LoadingSpinner from '../components/loadingSpinner';
import PageHeader from '../components/layout/pageHeader';
import { ConfirmationAlert, ErrorAlert } from '../components/alerts';
import apiClient from '../services/api';
import useApiRequest from '../hooks/useApiRequest';
import type { UserUpdate, UserRead } from '../types/api';
import Input from '../components/input';
import ButtonStretch from '../components/buttons/stretchButton';
import Card from '../components/card';
import SectionHeader from '../components/layout/sectionHeader';
import ProfileInfoItem from '../components/profile/profileInfoItem';
import AuthCard from '../components/auth/authCard';
import AuthRedirectLink from '../components/auth/authRedirectLink';
import ActionButton from '../components/buttons/actionButton';
import SecondaryButton from '../components/buttons/secondaryButton';
import Divider from '../components/layout/divider';

function Profile() {
  const {
    user,
    isLoading: authIsLoading,
    checkAuthStatus,
    login: authLogin,
  } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });
    }
  }, [user]);

  const updateUserRequestFn = (payload: { userId: number; data: UserUpdate }) =>
    apiClient.put<UserRead>(`/users/${payload.userId}`, payload.data);

  const {
    error: updateApiError,
    isLoading: isUpdating,
    executeRequest: executeUpdateUser,
    setError: setUpdateApiError,
  } = useApiRequest(updateUserRequestFn);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setUpdateApiError(null);
    setStatusMessage(null);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setUpdateApiError(null);
    setStatusMessage(null);
    if (user) {
      // Reset form data to current user details and clear password fields
      setFormData({
        username: user.username,
        email: user.email,
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) return;
    setUpdateApiError(null);
    setStatusMessage(null);

    if (!formData.currentPassword.trim()) {
      setUpdateApiError('Current password is required to save changes.');
      return;
    }

    const payload: UserUpdate = {
      current_password: formData.currentPassword,
    };
    let hasChanges = false;

    // Username
    if (formData.username && formData.username.trim() !== user.username) {
      if (!formData.username.trim()) {
        setUpdateApiError('Username cannot be empty.');
        return;
      }
      payload.username = formData.username.trim();
      hasChanges = true;
    } else if (formData.username === '' && user.username !== '') {
      // If user explicitly clears username, and it was not empty before
      setUpdateApiError('Username cannot be empty.');
      return;
    }

    // Email
    if (formData.email && formData.email.trim() !== user.email) {
      if (!formData.email.trim()) {
        setUpdateApiError('Email cannot be empty.');
        return;
      }
      if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
        setUpdateApiError('Please enter a valid email address.');
        return;
      }
      payload.email = formData.email.trim();
      hasChanges = true;
    } else if (formData.email === '' && user.email !== '') {
      setUpdateApiError('Email cannot be empty.');
      return;
    }

    // New Password
    if (formData.newPassword) {
      if (!formData.newPassword.trim()) {
        setUpdateApiError('New password cannot be empty.');
        return;
      }
      if (formData.newPassword !== formData.confirmNewPassword) {
        setUpdateApiError("New passwords don't match.");
        return;
      }
      payload.password = formData.newPassword; // API expects 'password' for the new password
      hasChanges = true;
    } else if (formData.confirmNewPassword) {
      // If confirmNewPassword is set but newPassword is not
      setUpdateApiError(
        'New password is required if confirm new password is provided.'
      );
      return;
    }

    if (!hasChanges) {
      setStatusMessage({
        type: 'info',
        message:
          'No changes to username, email, or password were detected. ' +
          'If you intended to save, please ensure your current password is correct. ' +
          'Otherwise, modify the fields you wish to change.',
      });
      return;
    }

    const result = await executeUpdateUser({ userId: user.id, data: payload });

    if (result) {
      // await checkAuthStatus(); // This will refresh the user context and trigger useEffect to reset formData
      authLogin(result); // Use the returned user data to update auth context
      setIsEditing(false);
      setStatusMessage({
        type: 'success',
        message: 'Profile updated successfully!',
      });
    }
    // updateApiError will be set by the hook if there's an error
  };

  if (authIsLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return (
      <AuthCard title="Profile">
        <ErrorAlert message="User not found. Please log in." />
        <AuthRedirectLink text="Go to" linkText="Login" to="/login" />
      </AuthCard>
    );
  }

  return (
    <div>
      <PageHeader
        title="Profile"
        subtitle={`Manage your account details, ${user.username}.`}
      />
      <Card>
        <SectionHeader title="Account Information" />

        {statusMessage && (
          <div className="mb-4">
            {statusMessage.type === 'success' && (
              <ConfirmationAlert message={statusMessage.message} />
            )}
            {statusMessage.type === 'error' && (
              <ErrorAlert message={statusMessage.message} />
            )}
            {statusMessage.type === 'info' && (
              <ConfirmationAlert message={statusMessage.message} />
            )}
          </div>
        )}
        {updateApiError && (
          <div className="mb-4">
            <ErrorAlert message={updateApiError} />
          </div>
        )}

        {!isEditing ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300 mb-6">
              <ProfileInfoItem label="Username">
                <p>{user.username}</p>
              </ProfileInfoItem>
              <ProfileInfoItem label="Email">
                <p>{user.email}</p>
              </ProfileInfoItem>
              <ProfileInfoItem label="Email Verified">
                {user.email_verified ? (
                  <ConfirmationAlert message="Yes" />
                ) : (
                  <div className="flex items-center">
                    <ErrorAlert message="No" />
                    <Link
                      to="/verify-email"
                      className="ml-2 text-sm text-indigo-400 hover:text-indigo-300"
                    >
                      Verify Email
                    </Link>
                  </div>
                )}
              </ProfileInfoItem>
              <ProfileInfoItem label="Account Status">
                <p>{user.disabled ? 'Disabled' : 'Active'}</p>
              </ProfileInfoItem>
            </div>
            <ActionButton onClick={handleEditToggle} className="mr-2">
              Edit Profile
            </ActionButton>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 mb-6">
            <Input
              label="Username"
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleInputChange}
              disabled={isUpdating}
              required
              autoComplete="username"
            />
            <Input
              label="Email"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={isUpdating}
              required
              autoComplete="email"
            />
            <Input
              label="New Password (leave blank to keep current)"
              id="newPassword"
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={handleInputChange}
              disabled={isUpdating}
              autoComplete="new-password"
            />
            <Input
              label="Confirm New Password"
              id="confirmNewPassword"
              name="confirmNewPassword"
              type="password"
              value={formData.confirmNewPassword}
              onChange={handleInputChange}
              disabled={isUpdating}
              autoComplete="new-password"
            />
            <Divider />
            <Input
              label="Current Password (required to save any changes)"
              id="currentPassword"
              name="currentPassword"
              type="password"
              value={formData.currentPassword}
              onChange={handleInputChange}
              disabled={isUpdating}
              required
              autoComplete="current-password"
            />
            <div className="flex space-x-2 pt-2">
              <ButtonStretch type="submit" disabled={isUpdating}>
                {isUpdating ? 'Saving...' : 'Save Changes'}
              </ButtonStretch>
              <SecondaryButton
                type="button"
                onClick={handleEditToggle}
                disabled={isUpdating}
                className="w-full"
              >
                Cancel
              </SecondaryButton>
            </div>
          </form>
        )}

        <Divider />
        <ActionButton
          onClick={async () => {
            setStatusMessage(null);
            setUpdateApiError(null);
            await checkAuthStatus();
            setStatusMessage({
              type: 'success',
              message: 'Profile data refreshed.',
            });
          }}
          disabled={authIsLoading || isUpdating}
        >
          {authIsLoading || isUpdating
            ? 'Refreshing...'
            : 'Refresh Profile Data'}
        </ActionButton>
      </Card>
    </div>
  );
}
export default Profile;
