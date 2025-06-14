import React from 'react';
import { Link } from 'react-router-dom';
import type { PartRead } from '../../types/Api';
import Card from '../common/Card';
import CardInfoItem from '../common/CardInfoItem';
import ImageWithPlaceholder from '../common/ImageWithPlaceholder';

interface PartListItemProps {
  part: PartRead;
}

const PartListItem: React.FC<PartListItemProps> = ({ part }) => {
  return (
    <Link
      to={`/parts/${part.id}`} // Assuming a route like /parts/:partId for viewing a part
      className="block hover:no-underline h-full"
    >
      <Card className="flex flex-col h-full hover:border-indigo-500 border-2 border-transparent transition-colors">
        <ImageWithPlaceholder
          srcUrl={part.image_url}
          altText={part.name}
          imageClassName="w-full h-32 object-cover rounded-md mb-3"
          containerClassName="w-full h-32 mb-3"
          fallbackText="No image"
        />
        <div className="flex-grow flex flex-col">
          <h3 className="text-lg font-semibold text-indigo-400 mb-2 truncate">
            {part.name}
          </h3>
          {part.manufacturer && (
            <p className="text-sm text-gray-400 mb-1 truncate">
              By: {part.manufacturer}
            </p>
          )}
          {part.part_number && (
            <CardInfoItem label="P/N">
              <p className="truncate">{part.part_number}</p>
            </CardInfoItem>
          )}
          {part.price !== null && part.price !== undefined && (
            <CardInfoItem label="Price">
              <p>${part.price.toFixed(2)}</p>
            </CardInfoItem>
          )}
          <div className="text-xs text-gray-500 mt-auto pt-1"></div>
        </div>
      </Card>
    </Link>
  );
};

export default PartListItem;
