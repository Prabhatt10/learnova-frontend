import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import useClassrooms from '../hooks/useClassrooms';

import DashboardHeader from '../components/dashboard/DashboardHeader';
import DashboardTabs from '../components/dashboard/DashboardTabs';
import ClassroomCard from '../components/classroom/ClassroomCard';
import CreateClassroomModal from '../components/classroom/CreateClassroomModal';
import JoinClassroomModal from '../components/classroom/JoinClassroomModal';

import Loader from '../components/common/Loader';
import EmptyState from '../components/common/EmptyState';
import Notification from '../components/common/Notification';
import { FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';

function Dashboard() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const {
    instructedClassrooms,
    enrolledClassrooms,
    loading,
    error,
    refetch,
  } = useClassrooms(isAuthenticated);

  const [activeTab, setActiveTab] = useState('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, authLoading, navigate]);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 4000);
  };

  const totalTeaching = instructedClassrooms.length;
  const totalEnrolled = enrolledClassrooms.length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 font-[poppins] w-full">
      {/* Header with actions */}
      <DashboardHeader
        userName={user?.userName}
        onOpenJoin={() => setIsJoinOpen(true)}
        onOpenCreate={() => setIsCreateOpen(true)}
      />

      {/* Notifications */}
      {notification && (
        <Notification
          type="success"
          message={notification}
          onDismiss={() => setNotification('')}
          className="mt-4"
        />
      )}

      {error && (
        <Notification
          type="error"
          message={error}
          className="mt-4"
        />
      )}

      {/* Tab Filter */}
      <DashboardTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        teachingCount={totalTeaching}
        enrolledCount={totalEnrolled}
      />

      {/* Content Area */}
      {loading ? (
        <Loader message="Loading your classrooms..." />
      ) : (
        <div className="mt-6 space-y-10">
          {/* Teaching Section */}
          {(activeTab === 'all' || activeTab === 'teaching') && (
            <section>
              {activeTab === 'all' && (
                <div className="flex items-center gap-2 mb-4">
                  <FaChalkboardTeacher className="text-[#333333]" />
                  <h2 className="text-lg font-bold text-[#333333]">Teaching</h2>
                  <span className="text-xs text-gray-400">({totalTeaching})</span>
                </div>
              )}

              {totalTeaching === 0 ? (
                activeTab === 'teaching' && (
                  <EmptyState
                    icon={FaChalkboardTeacher}
                    title="You haven't created any classrooms yet"
                    description="Create a classroom to share materials, manage student enrollments, and track progress."
                    actionText="Create First Classroom"
                    onAction={() => setIsCreateOpen(true)}
                  />
                )
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {instructedClassrooms.map((cls) => (
                    <ClassroomCard key={cls._id} classroom={cls} isInstructor={true} />
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Enrolled Section */}
          {(activeTab === 'all' || activeTab === 'enrolled') && (
            <section>
              {activeTab === 'all' && (
                <div className="flex items-center gap-2 mb-4">
                  <FaUserGraduate className="text-[#333333]" />
                  <h2 className="text-lg font-bold text-[#333333]">Enrolled</h2>
                  <span className="text-xs text-gray-400">({totalEnrolled})</span>
                </div>
              )}

              {totalEnrolled === 0 ? (
                activeTab === 'enrolled' && (
                  <EmptyState
                    icon={FaUserGraduate}
                    title="You are not enrolled in any classrooms"
                    description="Ask your instructor for a 6-character classroom code to join an active classroom."
                    actionText="Join a Classroom"
                    onAction={() => setIsJoinOpen(true)}
                  />
                )
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {enrolledClassrooms.map((cls) => (
                    <ClassroomCard key={cls._id} classroom={cls} isInstructor={false} />
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Global Empty State */}
          {totalTeaching === 0 && totalEnrolled === 0 && (
            <EmptyState
              icon={FaChalkboardTeacher}
              title="Get Started with Learnova"
              description="Join an existing classroom with a code or create your own to start teaching students and uploading learning materials."
              actionText="Create a Classroom"
              onAction={() => setIsCreateOpen(true)}
              className="py-16"
            />
          )}
        </div>
      )}

      {/* Modals */}
      <CreateClassroomModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreated={() => {
          refetch();
          showNotification('Classroom created successfully!');
        }}
      />

      <JoinClassroomModal
        isOpen={isJoinOpen}
        onClose={() => setIsJoinOpen(false)}
        onJoined={(msg) => {
          refetch();
          showNotification(msg || 'Classroom joined successfully!');
        }}
      />
    </div>
  );
}

export default Dashboard;
