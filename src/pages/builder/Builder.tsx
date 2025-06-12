import { useEffect, useState } from 'react';
import apiClient from '../../services/Api';
import useApiRequest from '../../hooks/UseApiRequest';
import type { CarRead } from '../../types/Api';
import PageHeader from '../../components/layout/PageHeader';
import LoadingSpinner from '../../components/LoadingSpinner';
import CarList from '../../components/cars/CarList';
import CreateCarForm from '../../components/cars/CreateCarForm';
import Divider from '../../components/layout/Divider';

const fetchMyCarsRequestFn = () => apiClient.get<CarRead[]>('/cars/');

function Builder() {
  const [myCars, setMyCars] = useState<CarRead[]>([]);

  const {
    data: fetchedCarsData,
    isLoading: isLoadingCars,
    error: carsError,
    executeRequest: fetchMyCars,
  } = useApiRequest(fetchMyCarsRequestFn);

  useEffect(() => {
    fetchMyCars(undefined); // No payload needed for GET
  }, [fetchMyCars]);

  useEffect(() => {
    if (fetchedCarsData) {
      setMyCars(fetchedCarsData);
    }
  }, [fetchedCarsData]);

  const handleCarCreated = (newCar: CarRead) => {
    setMyCars((prevCars) => [...prevCars, newCar]);
    // Optionally, re-fetch all cars to ensure consistency if order matters or other side effects
    // fetchMyCars(undefined);
  };

  return (
    <div>
      <PageHeader
        title="Car Builder"
        subtitle="Manage your cars and build lists."
      />

      <CreateCarForm onCarCreated={handleCarCreated} />

      <Divider />

      {isLoadingCars && <LoadingSpinner />}
      <CarList
        cars={myCars}
        isLoading={false} // Loading is handled above for the whole section
        error={carsError}
        title="Your Cars"
        emptyMessage="You haven't added any cars yet. Add one above to get started!"
      />
      {/* Future: Add UI for selecting a car and managing its build lists */}
    </div>
  );
}
export default Builder;
