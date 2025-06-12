import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../services/Api';
import useApiRequest from '../hooks/UseApiRequest';
import type { UserRead, CarRead } from '../types/Api';
import PageHeader from '../components/layout/PageHeader';
import Card from '../components/Card';
import SectionHeader from '../components/layout/SectionHeader';
import ProfileInfoItem from '../components/profile/ProfileInfoItem';
import LoadingSpinner from '../components/LoadingSpinner';
import { ErrorAlert } from '../components/Alerts';
import CarList from '../components/cars/CarList';
import Divider from '../components/layout/Divider';

const fetchUserRequestFn = (
  userId: string // userId will be a string from URL params
) => apiClient.get<UserRead>(`/users/${userId}`);

// Assumed API endpoint to fetch cars for a specific user ID
// This might need adjustment based on your actual backend API capabilities
const fetchCarsByUserIdRequestFn = (userId: string) =>
  apiClient.get<CarRead[]>(`/cars/?user_id=${userId}`); // Example: /api/cars/?user_id=123

function ViewUser() {
  const { userId } = useParams<{ userId: string }>(); // Changed from username to userId

  const {
    data: user,
    isLoading: isLoadingUser,
    error: userApiError,
    executeRequest: fetchUser,
  } = useApiRequest(fetchUserRequestFn);

  const {
    data: userCars,
    isLoading: isLoadingUserCars,
    error: userCarsError,
    executeRequest: fetchUserCars,
  } = useApiRequest(fetchCarsByUserIdRequestFn);

  useEffect(() => {
    if (userId) {
      fetchUser(userId);
      fetchUserCars(userId); // Fetch cars for the viewed user
    }
  }, [userId, fetchUser, fetchUserCars]); // Dependency array updated to userId

  if (isLoadingUser || isLoadingUserCars) {
    return (
      <>
        <PageHeader title="User Profile" />
        <LoadingSpinner />
      </>
    );
  }

  if (userApiError) {
    return (
      <div>
        <PageHeader title="User Profile" />
        <Card>
          <ErrorAlert
            message={`Failed to load profile for User ID "${userId}". ${userApiError}`}
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

      <Divider />

      <CarList
        cars={userCars}
        isLoading={isLoadingUserCars}
        error={
          userCarsError ||
          (userCars === null && !isLoadingUserCars && !userId
            ? 'Could not determine user to fetch cars for.'
            : null)
        }
        title={`${user.username}'s Cars`}
        emptyMessage={`${user.username} has not made any cars public or has no cars.`}
      />
    </div>
  );
}

export default ViewUser;
