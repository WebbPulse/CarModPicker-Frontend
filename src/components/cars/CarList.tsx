import React from 'react';
import type { CarRead } from '../../types/Api';
import CarListItem from './CarListItem';
import SectionHeader from '../layout/SectionHeader';
import { ErrorAlert } from '../Alerts';

interface CarListProps {
  cars: CarRead[] | null;
  isLoading: boolean;
  error?: string | null;
  title?: string;
  emptyMessage?: string;
}

const CarList: React.FC<CarListProps> = ({
  cars,
  isLoading,
  error,
  title = 'Cars',
  emptyMessage = 'No cars found.',
}) => {
  if (isLoading) {
    // Handled by parent or add a local spinner
    return null;
  }

  if (error) {
    return <ErrorAlert message={error} />;
  }

  if (!cars || cars.length === 0) {
    return (
      <div>
        <SectionHeader title={title} />
        <p className="text-gray-400">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div>
      <SectionHeader title={title} />
      {cars.map((car) => (
        <CarListItem key={car.id} car={car} />
      ))}
    </div>
  );
};

export default CarList;
