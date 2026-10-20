import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import classroomService from '../services/classroom.service';
import resourceService from '../services/resource.service';
import useClassroomDetails from '../hooks/useClassroomDetails';

import ClassroomHeader from '../components/classroom/ClassroomHeader';
import ClassroomTabs from '../components/classroom/ClassroomTabs';
import ResourceList from '../components/classroom/ResourceList';
import UploadResourceModal from '../components/classroom/UploadResourceModal';
import EditClassroomModal from '../components/classroom/EditClassroomModal';
import ClassMembersList from '../components/classroom/ClassMembersList';
import PendingRequestsList from '../components/classroom/PendingRequestsList';

import Loader from '../components/common/Loader';
import Notification from '../components/common/Notification';
import { FaArrowLeft } from 'react-icons/fa';

function ClassroomDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading: authLoading } = useAuth();

  const {
    classroom,
    setClassroom,
    isInstructor,
    files,
    setFiles,
    loading,
    error,
    refetch,
  } = useClassroomDetails(id, isAuthenticated);

  const [activeTab, setActiveTab] = useState('resources'); // 'resources' | 'people'
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [updatingClass, setUpdatingClass] = useState(false);
  const [deletingClass, setDeletingClass] = useState(false);
  const [copied, setCopied] = useState(false);
  const [notification, setNotification] = useState('');

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 4000);
  };

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, authLoading, navigate]);

  const handleCopyCode = () => {
    if (classroom?.classJoinCode) {
      navigator.clipboard.writeText(classroom.classJoinCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Instructor Classroom Update
  const handleUpdateClassroom = async (updatedFields) => {
    setUpdatingClass(true);
    try {
      const res = await classroomService.updateClassroom(id, updatedFields);
      if (res?.success) {
        setClassroom(res.classroom);
        showNotification('Classroom details updated successfully!');
        return true;
      }
    } catch (err) {
      showNotification(err?.message || 'Failed to update classroom');
    } finally {
      setUpdatingClass(false);
    }
    return false;
  };

  // Instructor Classroom Delete
  const handleDeleteClassroom = async () => {
    if (
      !window.confirm(
        `Are you sure you want to permanently delete "${classroom?.className}"? This will remove all students and resources.`
      )
    ) {
      return;
    }

    setDeletingClass(true);
    try {
      const res = await classroomService.deleteClassroom(id);
      if (res?.success) {
        navigate('/dashboard');
      }
    } catch (err) {
      showNotification(err?.message || 'Failed to delete classroom');
    } finally {
      setDeletingClass(false);
    }
  };

  // Student Leave Classroom
  const handleLeaveClassroom = async () => {
    if (!window.confirm('Are you sure you want to leave this classroom?')) return;
    try {
      const res = await classroomService.leaveClassroom(id);
      if (res?.success) {
        navigate('/dashboard');
      }
    } catch (err) {
      showNotification(err?.message || 'Failed to leave classroom');
    }
  };

  // Student Request Approvals
  const handleAcceptRequest = async (userID) => {
    try {
      const res = await classroomService.acceptRequest(id, userID);
      if (res?.success) {
        showNotification('Student request accepted');
        refetch();
      }
    } catch (err) {
      showNotification(err?.message || 'Failed to accept request');
    }
  };

  const handleDeclineRequest = async (userID) => {
    try {
      const res = await classroomService.declineRequest(id, userID);
      if (res?.success) {
        showNotification('Student request declined');
        refetch();
      }
    } catch (err) {
      showNotification(err?.message || 'Failed to decline request');
    }
  };

  const handleRemoveStudent = async (studentID) => {
    if (!window.confirm('Are you sure you want to remove this student from the classroom?')) return;
    try {
      const res = await classroomService.removeStudent(id, studentID);
      if (res?.success) {
        showNotification('Student removed from classroom');
        refetch();
      }
    } catch (err) {
      showNotification(err?.message || 'Failed to remove student');
    }
  };

  // Resource Upload
  const handleUploadFile = async (payload) => {
    setUploading(true);
    try {
      const res = await resourceService.uploadResource(id, payload);
      if (res?.success) {
        showNotification('Learning resource uploaded successfully!');
        refetch();
        return true;
      }
    } catch (err) {
      showNotification(err?.message || 'Failed to upload resource');
    } finally {
      setUploading(false);
    }
    return false;
  };

  // Resource Deletion
  const handleDeleteFile = async (fileId, fileName) => {
    if (!window.confirm(`Delete learning resource "${fileName}"?`)) return;
    try {
      const res = await resourceService.deleteResource(id, fileId);
      if (res?.success) {
        showNotification('Resource deleted successfully');
        setFiles((prev) => prev.filter((f) => f._id !== fileId));
      }
    } catch (err) {
      showNotification(err?.message || 'Failed to delete resource');
    }
  };

  if (loading) {
    return <Loader message="Loading classroom details..." />;
  }

  if (error || !classroom) {
    return (
      <div className="py-24 max-w-xl mx-auto px-4 text-center font-[poppins]">
        <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-red-700">
          <h2 className="text-lg font-bold mb-1">Access Restricted</h2>
          <p className="text-sm mb-4">{error || 'Classroom not found'}</p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#333333] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors"
          >
            <FaArrowLeft className="h-3 w-3" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </div>
    );
  }

  const enrolledStudents = classroom.studentEnrolled || [];
  const pendingRequests = classroom.pendingRequests || [];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 font-[poppins] w-full">
      {/* Back button */}
      <div className="mb-4">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black transition-colors"
        >
          <FaArrowLeft className="h-3 w-3" />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      {/* Classroom Hero Banner */}
      <ClassroomHeader
        classroom={classroom}
        isInstructor={isInstructor}
        copied={copied}
        onCopyCode={handleCopyCode}
        onOpenEdit={() => setIsEditOpen(true)}
        onDeleteClassroom={handleDeleteClassroom}
        deletingClass={deletingClass}
      />

      {/* Notification Toast */}
      {notification && (
        <Notification
          type="success"
          message={notification}
          onDismiss={() => setNotification('')}
          className="mt-4"
        />
      )}

      {/* Navigation Tabs */}
      <ClassroomTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        filesCount={files.length}
        membersCount={enrolledStudents.length}
        pendingCount={pendingRequests.length}
        isInstructor={isInstructor}
        onOpenUpload={() => setIsUploadOpen(true)}
        onLeaveClassroom={handleLeaveClassroom}
      />

      {/* Tab 1: Learning Resources */}
      {activeTab === 'resources' && (
        <ResourceList
          files={files}
          currentUserId={user?._id}
          isInstructor={isInstructor}
          onOpenUpload={() => setIsUploadOpen(true)}
          onDeleteFile={handleDeleteFile}
        />
      )}

      {/* Tab 2: Class Members */}
      {activeTab === 'people' && (
        <div className="mt-6 space-y-6">
          {isInstructor && (
            <PendingRequestsList
              requests={pendingRequests}
              onAccept={handleAcceptRequest}
              onDecline={handleDeclineRequest}
            />
          )}

          <ClassMembersList
            students={enrolledStudents}
            isInstructor={isInstructor}
            joinCode={classroom.classJoinCode}
            onRemoveStudent={handleRemoveStudent}
          />
        </div>
      )}

      {/* Upload Resource Modal */}
      <UploadResourceModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUpload={handleUploadFile}
        uploading={uploading}
      />

      {/* Edit Classroom Modal */}
      <EditClassroomModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        initialData={classroom}
        onUpdate={handleUpdateClassroom}
        updating={updatingClass}
      />
    </div>
  );
}

export default ClassroomDetails;
