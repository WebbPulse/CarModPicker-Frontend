import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../services/Api';
import useApiRequest from '../hooks/UseApiRequest';
import type { UserRead } from '../types/Api';
import PageHeader from '../components/layout/PageHeader';
import Card from '../components/common/Card';
import SectionHeader from '../components/layout/SectionHeader';
import CardInfoItem from '../components/common/CardInfoItem';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { ErrorAlert } from '../components/common/Alerts';
import CarList from '../components/cars/CarList';
import Divider from '../components/layout/Divider';

const fetchUserRequestFn = (
  userId: string // userId will be a string from URL params
) => apiClient.get<UserRead>(`/users/${userId}`);

function ViewUser() {
  const { userId: userIdParam } = useParams<{ userId: string }>(); // Renamed for clarity

  const {
    data: user,
    isLoading: isLoadingUser,
    error: userApiError,
    executeRequest: fetchUser,
  } = useApiRequest(fetchUserRequestFn);

  useEffect(() => {
    if (userIdParam) {
      fetchUser(userIdParam);
      // DO NOT fetchUserCars(userIdParam) here; CarList will handle fetching cars.
    }
  }, [userIdParam, fetchUser]); // Dependency array updated

  if (isLoadingUser) {
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
            message={`Failed to load profile for User ID "${userIdParam}". ${userApiError}`}
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
          <ErrorAlert message={`User with ID "${userIdParam}" not found.`} />
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
          <CardInfoItem label="Profile Picture">
            {user.image_url ? (
              <img
                src={user.image_url}
                alt={`${user.username}'s profile`}
                className="h-48 w-48 object-cover"
              />
            ) : (
              <p className="text-gray-400">No image set.</p>
            )}
          </CardInfoItem>
          {/* This div creates an empty cell in the top-right on medium screens and up */}
          <div className="hidden md:block"></div>
          <CardInfoItem label="Username">
            <p>{user.username}</p>
          </CardInfoItem>
          <CardInfoItem label="User ID">
            <p>{user.id}</p>
          </CardInfoItem>
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
        userId={user.id} // Pass the numeric user.id to CarList
        // refreshKey is not strictly necessary here as CarList will fetch when user.id is available/changes.
        // If ViewUser had actions that should trigger a car list refresh independently,
        // then a refreshKey would be useful.
        title="Their Cars"
        emptyMessage="This user hasn't added any cars yet."
        // No onAddCarClick or showAddCarTile for the public view
      />
    </div>
  );
}

export default ViewUser;
