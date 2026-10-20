import api from './api';

export const resourceService = {
  getClassroomFiles: async (classroomId) => {
    return await api.get(`/classroom/${classroomId}/files`);
  },

  uploadResource: async (classroomId, { fileName, fileType, fileUrl, fileBase64 }) => {
    return await api.post(`/classroom/${classroomId}/upload`, {
      fileName,
      fileType,
      fileUrl,
      fileBase64,
    });
  },

  deleteResource: async (classroomId, fileId) => {
    return await api.delete(`/classroom/${classroomId}/files/${fileId}`);
  },
};

export default resourceService;
