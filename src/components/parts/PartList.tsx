import React, { useState, useEffect, useCallback } from 'react';
import type { PartRead } from '../../types/Api';
import PartListItem from './PartListItem';
import SectionHeader from '../layout/SectionHeader';
import { ErrorAlert } from '../common/Alerts';
import apiClient from '../../services/Api';
import useApiRequest from '../../hooks/UseApiRequest';
import LoadingSpinner from '../common/LoadingSpinner';
import AddItemTile from '../common/AddItemTile';

interface PartListProps {
  buildListId: number;
  canManageParts: boolean; // To determine if current user can add/edit/delete parts
  refreshKey?: number;
  title?: string;
  emptyMessage?: string;
  onAddPartClick?: () => void; // Callback to open create form
}

const PartList: React.FC<PartListProps> = ({
  buildListId,
  canManageParts,
  refreshKey,
  title = 'Parts',
  emptyMessage = 'No parts found for this build list.',
  onAddPartClick,
}) => {
  const [internalParts, setInternalParts] = useState<PartRead[] | null>(null);

  const fetchPartsByBuildListIdRequestFn = useCallback(
    (id: number) => apiClient.get<PartRead[]>(`/parts/build-list/${id}`), // Ensure this endpoint exists
    []
  );

  const {
    data: fetchedApiParts,
    isLoading,
    error,
    executeRequest: fetchBuildListParts,
  } = useApiRequest(fetchPartsByBuildListIdRequestFn);

  useEffect(() => {
    fetchBuildListParts(buildListId);
  }, [buildListId, fetchBuildListParts, refreshKey]);

  useEffect(() => {
    if (fetchedApiParts) {
      setInternalParts(fetchedApiParts);
    } else if (!isLoading && !error) {
      setInternalParts([]);
    }
  }, [fetchedApiParts, isLoading, error]);

  if (isLoading) {
    return (
      <>
        <SectionHeader title={title} />
        <LoadingSpinner />
      </>
    );
  }

  if (error) {
    return (
      <>
        <SectionHeader title={title} />
        <ErrorAlert message={`Failed to load parts: ${error}`} />
      </>
    );
  }

  const noPartsToShow = !internalParts || internalParts.length === 0;

  return (
    <div>
      <SectionHeader title={title} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {canManageParts && onAddPartClick && (
          <AddItemTile
            title="Add New Part"
            description="Click here to add a part to this build list."
            onClick={onAddPartClick}
          />
        )}
        {internalParts &&
          internalParts.map((part) => (
            <PartListItem key={part.id} part={part} />
          ))}
      </div>
      {noPartsToShow && !canManageParts && (
        <p className="text-gray-400 mt-4">{emptyMessage}</p>
      )}
      {noPartsToShow && canManageParts && (
        <p className="text-gray-400 mt-4">
          This build list has no parts yet. Click the tile above to add one!
        </p>
      )}
    </div>
  );
};

export default PartList;
