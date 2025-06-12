import React, { useState, useEffect, useCallback } from 'react';
import type { CarRead } from '../../types/Api';
import CarListItem from './CarListItem';
import SectionHeader from '../layout/SectionHeader';
import { ErrorAlert } from '../Alerts';
import apiClient from '../../services/Api'; // Import apiClient
import useApiRequest from '../../hooks/UseApiRequest'; // Import useApiRequest
import LoadingSpinner from '../LoadingSpinner'; // Import LoadingSpinner

interface CarListProps {
  userId?: number; // User ID to fetch cars for
  refreshKey?: number; // Optional key to trigger a refetch
  title?: string;
  emptyMessage?: string;
}

const CarList: React.FC<CarListProps> = ({
  userId,
  refreshKey,
  title = 'Cars',
  emptyMessage = 'No cars found.',
}) => {
  const [internalCars, setInternalCars] = useState<CarRead[] | null>(null);

  // Define the request function for fetching cars by user ID
  const fetchCarsByUserIdRequestFn = useCallback(
    (id: number) => apiClient.get<CarRead[]>(`/cars/user/${id}`),
    []
  );

  const {
    data: fetchedApiCars,
    isLoading,
    error,
    executeRequest: fetchUserCars,
  } = useApiRequest(fetchCarsByUserIdRequestFn);

  useEffect(() => {
    if (userId) {
      fetchUserCars(userId);
    } else {
      setInternalCars([]); // Clear cars if no userId is provided
    }
  }, [userId, fetchUserCars, refreshKey]); // Depend on userId, fetchUserCars, and refreshKey

  useEffect(() => {
    if (fetchedApiCars) {
      setInternalCars(fetchedApiCars);
    } else if (!isLoading && userId && !error) {
      // If a fetch was attempted for a user, and it resulted in no data without an error,
      // assume an empty list. This handles cases where API might return null/undefined for empty.
      setInternalCars([]);
    }
  }, [fetchedApiCars, isLoading, userId, error]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // If a userId was provided, but an error occurred during fetch
  if (userId && error) {
    return (
      <>
        <SectionHeader title={title} />
        <ErrorAlert message={error} />
      </>
    );
  }

  // If no userId is provided (e.g. user not logged in)
  // OR if userId is provided, no error, not loading, but no cars
  if (!userId || (!isLoading && (!internalCars || internalCars.length === 0))) {
    return (
      <div>
        <SectionHeader title={title} />
        <p className="text-gray-400">{emptyMessage}</p>
      </div>
    );
  }

  // If we have cars (internalCars should be an array here, possibly empty handled above)
  return (
    <div>
      <SectionHeader title={title} />
      {internalCars!.map((car) => (
        <CarListItem key={car.id} car={car} />
      ))}
    </div>
  );
};

export default CarList;
