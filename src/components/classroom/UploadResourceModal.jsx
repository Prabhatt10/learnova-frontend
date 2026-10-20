import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Input from '../common/Input';
import Notification from '../common/Notification';

function UploadResourceModal({ isOpen, onClose, onUpload, uploading }) {
  const [uploadData, setUploadData] = useState({
    fileName: '',
    fileType: 'pdf',
    fileUrl: '',
    fileBase64: '',
  });
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!uploadData.fileName) {
      setUploadData((prev) => ({ ...prev, fileName: file.name }));
    }

    const ext = file.name.split('.').pop().toLowerCase();
    let detectedType = 'other';
    if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(ext)) detectedType = 'image';
    else if (['pdf'].includes(ext)) detectedType = 'pdf';
    else if (['doc', 'docx', 'txt', 'rtf'].includes(ext)) detectedType = 'doc';
    else if (['ppt', 'pptx'].includes(ext)) detectedType = 'ppt';
    else if (['mp3', 'wav', 'm4a'].includes(ext)) detectedType = 'audio';

    setUploadData((prev) => ({ ...prev, fileType: detectedType }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadData((prev) => ({ ...prev, fileBase64: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!uploadData.fileName.trim()) {
      setError('File title is required');
      return;
    }
    if (!uploadData.fileBase64 && !uploadData.fileUrl.trim()) {
      setError('Please select a file or enter an external document URL');
      return;
    }

    setError('');
    const success = await onUpload({
      fileName: uploadData.fileName.trim(),
      fileType: uploadData.fileType,
      fileUrl: uploadData.fileUrl.trim() || undefined,
      fileBase64: uploadData.fileBase64 || undefined,
    });

    if (success) {
      setUploadData({ fileName: '', fileType: 'pdf', fileUrl: '', fileBase64: '' });
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upload Learning Resource">
      {error && (
        <Notification
          type="error"
          message={error}
          onDismiss={() => setError('')}
          className="mb-4"
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Resource Title"
          required
          value={uploadData.fileName}
          onChange={(e) => setUploadData((p) => ({ ...p, fileName: e.target.value }))}
          placeholder="e.g. Lecture 1 - Overview Slides"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="fileType">
            Resource Type
          </label>
          <select
            id="fileType"
            value={uploadData.fileType}
            onChange={(e) => setUploadData((p) => ({ ...p, fileType: e.target.value }))}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#333333]"
          >
            <option value="pdf">PDF Document</option>
            <option value="image">Image / Diagram</option>
            <option value="doc">Word / Text Document</option>
            <option value="ppt">Presentation Slides</option>
            <option value="audio">Audio Lecture</option>
            <option value="other">Other Link / File</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="filePicker">
            Select File (Upload)
          </label>
          <input
            id="filePicker"
            type="file"
            onChange={handleFileChange}
            className="block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer"
          />
        </div>

        <Input
          label="Or External Resource Link (Optional)"
          type="url"
          value={uploadData.fileUrl}
          onChange={(e) => setUploadData((p) => ({ ...p, fileUrl: e.target.value }))}
          placeholder="https://drive.google.com/... or cloud link"
        />

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={uploading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={uploading}
          >
            Upload Resource
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default UploadResourceModal;
