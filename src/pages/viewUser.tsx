import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../services/api';
import useApiRequest from '../hooks/useApiRequest';
import type { UserRead } from '../types/api';
import PageHeader from '../components/layout/pageHeader';
import Card from '../components/card';
import SectionHeader from '../components/layout/sectionHeader';
import ProfileInfoItem from '../components/profile/profileInfoItem';
import LoadingSpinner from '../components/loadingSpinner';
import { ErrorAlert } from '../components/alerts';

const fetchUserRequestFn = (
  userId: string // userId will be a string from URL params
) => apiClient.get<UserRead>(`/users/${userId}`);

function ViewUser() {
  const { userId } = useParams<{ userId: string }>(); // Changed from username to userId

  const {
    data: user,
    isLoading,
    error: apiError,
    executeRequest: fetchUser,
  } = useApiRequest(fetchUserRequestFn);

  useEffect(() => {
    if (userId) {
      fetchUser(userId);
    }
  }, [userId, fetchUser]); // Dependency array updated to userId

  if (isLoading) {
    return (
      <>
        <PageHeader title="User Profile" />
        <LoadingSpinner />
      </>
    );
  }

  if (apiError) {
    return (
      <div>
        <PageHeader title="User Profile" />
        <Card>
          <ErrorAlert
            message={`Failed to load profile for User ID "${userId}". ${apiError}`}
          />
        </Card>
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <PageHeader title="User Profile" />
        <Card>
          <ErrorAlert message={`User with ID "${userId}" not found.`} />
        </Card>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title={`Profile: ${user.username}`} />
      <Card>
        <SectionHeader title="Public Profile Information" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300 mb-6">
          <ProfileInfoItem label="Username">
            <p>{user.username}</p>
          </ProfileInfoItem>
          <ProfileInfoItem label="User ID">
            <p>{user.id}</p>
          </ProfileInfoItem>
          {/* 
            You can add more ProfileInfoItem components here for other public user data if available.
            For example, if UserRead included a public 'bio' or 'join_date':
            <ProfileInfoItem label="Join Date">
              <p>{new Date(user.join_date).toLocaleDateString()}</p>
            </ProfileInfoItem>
          */}
        </div>
        <p className="text-sm text-gray-400">
          This is a public user profile. For privacy, detailed account
          information is not displayed.
        </p>
      </Card>
    </div>
  );
}

export default ViewUser;
