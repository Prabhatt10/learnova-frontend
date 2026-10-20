import { useState, useEffect, useCallback } from 'react';
import classroomService from '../services/classroom.service';
import resourceService from '../services/resource.service';

export function useClassroomDetails(id, isAuthenticated) {
  const [classroom, setClassroom] = useState(null);
  const [isInstructor, setIsInstructor] = useState(false);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = useCallback(async () => {
    if (!id || !isAuthenticated) return;
    try {
      setLoading(true);
      setError('');

      const [classRes, filesRes] = await Promise.all([
        classroomService.getClassroomDetails(id),
        resourceService.getClassroomFiles(id).catch(() => ({ success: true, files: [] })),
      ]);

      if (classRes?.success) {
        setClassroom(classRes.classroom);
        setIsInstructor(classRes.isInstructor);
      }
      if (filesRes?.success) {
        setFiles(filesRes.files || []);
      }
    } catch (err) {
      setError(err?.message || 'Failed to load classroom details');
    } finally {
      setLoading(false);
    }
  }, [id, isAuthenticated]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    classroom,
    setClassroom,
    isInstructor,
    files,
    setFiles,
    loading,
    error,
    refetch: fetchData,
  };
}

export default useClassroomDetails;
