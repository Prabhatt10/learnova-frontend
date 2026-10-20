import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Input from '../common/Input';
import Notification from '../common/Notification';

function EditClassroomModal({
  isOpen,
  onClose,
  initialData,
  onUpdate,
  updating,
}) {
  const [formData, setFormData] = useState({
    className: '',
    subjectName: '',
    subjectCode: '',
    privacy: 'open',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        className: initialData.className || '',
        subjectName: initialData.subjectName || '',
        subjectCode: initialData.subjectCode || '',
        privacy: initialData.privacy || 'open',
      });
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.className.trim() || !formData.subjectName.trim() || !formData.subjectCode.trim()) {
      setError('All fields are required');
      return;
    }

    setError('');
    const success = await onUpdate({
      className: formData.className.trim(),
      subjectName: formData.subjectName.trim(),
      subjectCode: formData.subjectCode.trim(),
      privacy: formData.privacy,
    });

    if (success) {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Classroom Details">
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
          label="Classroom Name"
          required
          value={formData.className}
          onChange={(e) => setFormData((p) => ({ ...p, className: e.target.value }))}
          placeholder="e.g. Advanced Data Structures"
        />

        <Input
          label="Subject Name"
          required
          value={formData.subjectName}
          onChange={(e) => setFormData((p) => ({ ...p, subjectName: e.target.value }))}
          placeholder="e.g. Computer Science"
        />

        <Input
          label="Subject Code"
          required
          value={formData.subjectCode}
          onChange={(e) => setFormData((p) => ({ ...p, subjectCode: e.target.value }))}
          placeholder="e.g. CS301"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="editPrivacy">
            Enrollment Privacy
          </label>
          <select
            id="editPrivacy"
            value={formData.privacy}
            onChange={(e) => setFormData((p) => ({ ...p, privacy: e.target.value }))}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#333333]"
          >
            <option value="open">Open (Students join immediately)</option>
            <option value="approved">Requires Approval (Instructor accepts requests)</option>
          </select>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={updating}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={updating}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default EditClassroomModal;
