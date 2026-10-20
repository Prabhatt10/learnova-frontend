import api from './api';

export const classroomService = {
  getMyClassrooms: async () => {
    return await api.get('/classroom/my-classrooms');
  },

  getClassroomDetails: async (id) => {
    return await api.get(`/classroom/details/${id}`);
  },

  findClassroomByCode: async (code) => {
    return await api.get(`/classroom/findClassroomByClassCode/${code}`);
  },

  createClassroom: async ({ className, subjectName, subjectCode, privacy }) => {
    return await api.post('/classroom/createClassroom', {
      className,
      subjectName,
      subjectCode,
      privacy,
    });
  },

  updateClassroom: async (id, { className, subjectName, subjectCode, privacy }) => {
    return await api.put(`/classroom/updateClassroom/${id}`, {
      className,
      subjectName,
      subjectCode,
      privacy,
    });
  },

  deleteClassroom: async (id) => {
    return await api.delete(`/classroom/deleteClassroom/${id}`);
  },

  joinClassroom: async (code) => {
    return await api.post('/classroom/joinClassroom', { code });
  },

  leaveClassroom: async (id) => {
    return await api.post(`/classroom/leaveClassroom/${id}`);
  },

  acceptRequest: async (id, userID) => {
    return await api.post('/classroom/acceptRequest', { id, userID });
  },

  declineRequest: async (id, userID) => {
    return await api.post('/classroom/declineRequest', { id, userID });
  },

  removeStudent: async (id, studentID) => {
    return await api.post('/classroom/removeStudent', { id, studentID });
  },
};

export default classroomService;
