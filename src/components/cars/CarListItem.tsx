import React from 'react';
import type { CarRead } from '../../types/Api';
import Card from '../Card'; // Assuming Card can be used here or a simpler div
import ProfileInfoItem from '../profile/ProfileInfoItem';

interface CarListItemProps {
  car: CarRead;
}

const CarListItem: React.FC<CarListItemProps> = ({ car }) => {
  return (
    <Card className="mb-4">
      <h3 className="text-xl font-semibold text-indigo-400 mb-2">
        {car.year} {car.make} {car.model}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
        {car.trim && (
          <ProfileInfoItem label="Trim">
            <p>{car.trim}</p>
          </ProfileInfoItem>
        )}
        {car.vin && (
          <ProfileInfoItem label="VIN">
            <p>{car.vin}</p>
          </ProfileInfoItem>
        )}
        <ProfileInfoItem label="Car ID">
          <p>{car.id}</p>
        </ProfileInfoItem>
      </div>
      {/* Future: Add Link to view/manage build lists for this car */}
    </Card>
  );
};

export default CarListItem;
