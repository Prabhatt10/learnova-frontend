import { useState, useEffect, useCallback } from 'react';
import classroomService from '../services/classroom.service';

export function useClassrooms(isAuthenticated) {
  const [instructedClassrooms, setInstructedClassrooms] = useState([]);
  const [enrolledClassrooms, setEnrolledClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchClassrooms = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      setLoading(true);
      setError('');
      const res = await classroomService.getMyClassrooms();
      if (res?.success) {
        setInstructedClassrooms(res.instructedClassrooms || []);
        setEnrolledClassrooms(res.enrolledClassrooms || []);
      }
    } catch (err) {
      setError(err?.message || 'Failed to load classrooms');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchClassrooms();
  }, [fetchClassrooms]);

  return {
    instructedClassrooms,
    enrolledClassrooms,
    loading,
    error,
    refetch: fetchClassrooms,
  };
}

export default useClassrooms;
