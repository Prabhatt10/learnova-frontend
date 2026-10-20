import React, { useState } from 'react';
import { FaChalkboardTeacher, FaBook, FaCode } from 'react-icons/fa';
import classroomService from '../../services/classroom.service';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Notification from '../../components/common/Notification';

function CreateClassroomModal({ isOpen, onClose, onCreated }) {
  const [formData, setFormData] = useState({
    className: '',
    subjectName: '',
    subjectCode: '',
    privacy: 'anyone',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { className, subjectName, subjectCode, privacy } = formData;

    if (!className || !subjectName || !subjectCode) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await classroomService.createClassroom({
        className: className.trim(),
        subjectName: subjectName.trim(),
        subjectCode: subjectCode.trim(),
        privacy,
      });

      if (res?.success) {
        setFormData({ className: '', subjectName: '', subjectCode: '', privacy: 'anyone' });
        onCreated();
        onClose();
      } else {
        setError(res?.message || 'Failed to create classroom');
      }
    } catch (err) {
      setError(err?.message || 'An error occurred while creating classroom');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Classroom">
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
          name="className"
          required
          value={formData.className}
          onChange={handleChange}
          placeholder="e.g. Advanced Data Structures"
          icon={FaChalkboardTeacher}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Subject Name"
            name="subjectName"
            required
            value={formData.subjectName}
            onChange={handleChange}
            placeholder="e.g. Computer Science"
            icon={FaBook}
          />

          <Input
            label="Subject Code"
            name="subjectCode"
            required
            value={formData.subjectCode}
            onChange={handleChange}
            placeholder="e.g. CS-301"
            icon={FaCode}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="privacy">
            Enrollment Privacy
          </label>
          <select
            id="privacy"
            name="privacy"
            value={formData.privacy}
            onChange={handleChange}
            className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#333333]"
          >
            <option value="anyone">Open (Anyone with the join code can join instantly)</option>
            <option value="approved">Approval Required (Instructor must approve each student)</option>
          </select>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={loading}
          >
            Create Classroom
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default CreateClassroomModal;
