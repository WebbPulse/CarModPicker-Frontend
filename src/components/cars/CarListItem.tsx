import React from 'react';
import type { CarRead } from '../../types/Api';
import Card from '../Card'; // Assuming Card can be used here or a simpler div
import ProfileInfoItem from '../profile/ProfileInfoItem';

interface CarListItemProps {
  car: CarRead;
}

const CarListItem: React.FC<CarListItemProps> = ({ car }) => {
  return (
    <Card>
      <div className="flex flex-col h-full">
        {car.image_url && (
          <img
            src={car.image_url}
            alt={`${car.year} ${car.make} ${car.model}`}
            className="w-full h-40 object-cover rounded-md mb-4"
          />
        )}
        <div className="flex-grow flex flex-col">
          <h3 className="text-lg font-semibold text-indigo-400 mb-2">
            {car.year} {car.make} {car.model}
          </h3>
          <div className="grid grid-cols-1 gap-1 text-xs flex-grow">
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
        </div>
      </div>
      {/* Future: Add Link to view/manage build lists for this car */}
    </Card>
  );
};

export default CarListItem;
