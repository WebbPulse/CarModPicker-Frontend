import { useEffect, useState } from 'react';
import apiClient from '../../services/Api';
import useApiRequest from '../../hooks/UseApiRequest';
import type { CarRead } from '../../types/Api';
import PageHeader from '../../components/layout/PageHeader';
import LoadingSpinner from '../../components/LoadingSpinner';
import CarList from '../../components/cars/CarList';
import CreateCarForm from '../../components/cars/CreateCarForm';
import Divider from '../../components/layout/Divider';
import { useAuth } from '../../contexts/AuthContext';

function Builder() {
  const { user } = useAuth(); // Get the authenticated user
  const [refreshTrigger, setRefreshTrigger] = useState(0); // Add state to trigger refresh

  const handleCarCreated = (newCar: CarRead) => {
    // setMyCars((prevCars) => [...prevCars, newCar]); // Remove this
    setRefreshTrigger((prev) => prev + 1); // Increment refreshTrigger to refetch cars in CarList
  };

  return (
    <div>
      <PageHeader
        title="Car Builder"
        subtitle="Manage your cars and build lists."
      />

      <CreateCarForm onCarCreated={handleCarCreated} />

      <Divider />

      {/* {isLoadingCars && <LoadingSpinner />} Remove this, CarList handles its own loading */}
      <CarList
        userId={user?.id}
        refreshKey={refreshTrigger}
        title="Your Cars"
        emptyMessage="You haven't added any cars yet. Add one above to get started!"
      />
      {/* Future: Add UI for selecting a car and managing its build lists */}
    </div>
  );
}
export default Builder;
