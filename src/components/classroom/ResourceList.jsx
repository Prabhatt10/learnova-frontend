import React from 'react';
import { FaFileUpload } from 'react-icons/fa';
import ResourceCard from './ResourceCard';
import EmptyState from '../common/EmptyState';

function ResourceList({
  files = [],
  currentUserId,
  isInstructor,
  onOpenUpload,
  onDeleteFile,
}) {
  if (files.length === 0) {
    return (
      <EmptyState
        icon={FaFileUpload}
        title="No resources uploaded yet"
        description="Share lecture notes, PDFs, assignments, or audio materials with this classroom."
        actionText="Upload First Resource"
        onAction={onOpenUpload}
        className="mt-6"
      />
    );
  }

  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {files.map((file) => {
        const canDelete =
          isInstructor ||
          file.uploadedBy?._id === currentUserId ||
          file.uploadedBy === currentUserId;

        return (
          <ResourceCard
            key={file._id}
            file={file}
            canDelete={canDelete}
            onDelete={onDeleteFile}
          />
        );
      })}
    </div>
  );
}

export default ResourceList;
