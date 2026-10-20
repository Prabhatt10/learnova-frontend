import React from 'react';
import {
  FaFilePdf,
  FaFileImage,
  FaFileAlt,
  FaFileAudio,
  FaDownload,
  FaTrash,
} from 'react-icons/fa';

function getFileIcon(type) {
  switch (type) {
    case 'pdf':
      return <FaFilePdf className="h-6 w-6 text-red-500" />;
    case 'image':
      return <FaFileImage className="h-6 w-6 text-blue-500" />;
    case 'audio':
      return <FaFileAudio className="h-6 w-6 text-amber-500" />;
    case 'doc':
    case 'ppt':
      return <FaFileAlt className="h-6 w-6 text-indigo-500" />;
    default:
      return <FaFileAlt className="h-6 w-6 text-gray-500" />;
  }
}

function ResourceCard({ file, canDelete, onDelete }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      <div className="flex items-start gap-3.5">
        <div className="p-3 bg-gray-50 rounded-xl flex-shrink-0">
          {getFileIcon(file.fileType)}
        </div>
        <div className="flex-1 min-w-0">
          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-600 mb-1">
            {file.fileType}
          </span>
          <h4
            className="text-base font-bold text-gray-900 truncate"
            title={file.fileName}
          >
            {file.fileName}
          </h4>
          <p className="text-xs text-gray-400 mt-1">
            By {file.uploadedBy?.userName || 'Instructor'} •{' '}
            {file.uploadedAt
              ? new Date(file.uploadedAt).toLocaleDateString()
              : 'Recent'}
          </p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
        <a
          href={file.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-bold text-[#333333] hover:underline"
        >
          <FaDownload className="h-3 w-3 text-gray-500" />
          <span>Open / Download</span>
        </a>

        {canDelete && (
          <button
            type="button"
            onClick={() => onDelete(file._id, file.fileName)}
            className="p-1.5 text-gray-400 hover:text-red-600 transition-colors cursor-pointer rounded-md hover:bg-red-50"
            title="Delete resource"
          >
            <FaTrash className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

export default ResourceCard;
