import React, { useState, useEffect, useCallback } from 'react';
import type { CarRead } from '../../types/Api';
import CarListItem from './CarListItem';
import SectionHeader from '../layout/SectionHeader';
import { ErrorAlert } from '../Alerts';
import apiClient from '../../services/Api';
import useApiRequest from '../../hooks/UseApiRequest';
import LoadingSpinner from '../LoadingSpinner';
import Card from '../Card'; // Import Card for the "Add Car" tile

interface CarListProps {
  userId?: number;
  refreshKey?: number;
  title?: string;
  emptyMessage?: string;
  onAddCarClick?: () => void; // Callback to open the dialog
  showAddCarTile?: boolean; // To control visibility of the "Add Car" tile
}

const CarList: React.FC<CarListProps> = ({
  userId,
  refreshKey,
  title = 'Cars',
  emptyMessage = 'No cars found.',
  onAddCarClick,
  showAddCarTile = false,
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
    return (
      <>
        <SectionHeader title={title} />
        <LoadingSpinner />
      </>
    );
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

  const noCarsToShow = !internalCars || internalCars.length === 0;

  return (
    <div>
      <SectionHeader title={title} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {showAddCarTile && onAddCarClick && (
          <Card
            onClick={onAddCarClick}
            className="cursor-pointer hover:bg-gray-800 flex flex-col items-center justify-center text-center p-6 h-full min-h-[200px] border-2 border-dashed border-gray-700 hover:border-indigo-500 transition-colors"
          >
            <h3 className="text-xl font-semibold text-indigo-400 mb-2">
              Add a New Car
            </h3>
            <p className="text-gray-400 text-sm">
              Click here to add a vehicle to your garage.
            </p>
            {/* You could add an icon here e.g., <PlusIcon className="w-12 h-12 text-gray-500 mt-2" /> */}
          </Card>
        )}
        {internalCars &&
          internalCars.map((car) => <CarListItem key={car.id} car={car} />)}
      </div>
      {noCarsToShow && !showAddCarTile && (
        <p className="text-gray-400 mt-4">{emptyMessage}</p>
      )}
      {noCarsToShow && showAddCarTile && (
        <p className="text-gray-400 mt-4">
          You have no cars yet. Click the tile above to add your first one!
        </p>
      )}
    </div>
  );
};

export default CarList;
