import React from 'react';
import type { BuildListRead } from '../../types/Api';
import Card from '../common/Card';
import CardInfoItem from '../common/CardInfoItem'; // Re-using for consistency

interface BuildListItemProps {
  buildList: BuildListRead;
  // onClick?: () => void; // Future: for navigating to build list details
}

const BuildListItem: React.FC<BuildListItemProps> = ({ buildList }) => {
  return (
    <Card className="flex flex-col h-full">
      {buildList.image_url && (
        <img
          src={buildList.image_url}
          alt={buildList.name}
          className="w-full h-40 object-cover rounded-md mb-4"
        />
      )}
      <div className="flex-grow flex flex-col">
        <h3 className="text-lg font-semibold text-indigo-400 mb-2">
          {buildList.name}
        </h3>
        {buildList.description && (
          <p className="text-sm text-gray-400 mb-2 flex-grow">
            {buildList.description}
          </p>
        )}
        <div className="text-xs text-gray-500">
          <CardInfoItem label="Build List ID">
            <p>{buildList.id}</p>
          </CardInfoItem>
          <CardInfoItem label="Associated Car ID">
            <p>{buildList.car_id}</p>
          </CardInfoItem>
        </div>
      </div>
      {/* Future: Add Link to view/manage parts for this build list */}
    </Card>
  );
};

export default BuildListItem;
