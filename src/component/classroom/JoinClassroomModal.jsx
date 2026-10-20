import React, { useState } from 'react';
import { FaKey } from 'react-icons/fa';
import classroomService from '../../services/classroom.service';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Notification from '../../components/common/Notification';

function JoinClassroomModal({ isOpen, onClose, onJoined }) {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanCode = code.trim();

    if (!cleanCode) {
      setError('Please enter a 6-character classroom code');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await classroomService.joinClassroom(cleanCode);
      if (res?.success) {
        setCode('');
        onJoined(res.message);
        onClose();
      } else {
        setError(res?.message || 'Failed to join classroom');
      }
    } catch (err) {
      setError(err?.message || 'Could not join classroom. Check the code and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Join a Classroom" maxWidth="max-w-md">
      <p className="text-sm text-gray-600 mb-4">
        Ask your instructor for the 6-character class code, then enter it below.
      </p>

      {error && (
        <Notification
          type="error"
          message={error}
          onDismiss={() => setError('')}
          className="mb-4"
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Class Code (6 characters)"
          name="classCode"
          maxLength="6"
          required
          autoFocus
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            if (error) setError('');
          }}
          placeholder="e.g. 7kQx2M"
          icon={FaKey}
          className="font-mono tracking-wider text-base"
        />

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
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
            Join Classroom
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default JoinClassroomModal;
