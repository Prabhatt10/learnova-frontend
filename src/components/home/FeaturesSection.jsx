import React, { useMemo } from 'react';
import { PiVideoConference } from 'react-icons/pi';
import { MdOutlineAssignment } from 'react-icons/md';
import { IoMdCloudOutline } from 'react-icons/io';
import { FaRocketchat, FaMobileAlt } from 'react-icons/fa';
import { VscGraphLine } from 'react-icons/vsc';

function FeaturesSection() {
  const features = useMemo(
    () => [
      {
        id: 'video',
        title: 'HD Video Classes',
        desc:
          'Crystal-clear video conferencing with screen sharing, breakout rooms, and interactive whiteboards.',
        Icon: PiVideoConference,
      },
      {
        id: 'assign',
        title: 'Smart Assignments',
        desc:
          'AI-powered assignment creation, automatic grading, and analytics to track progress and performance.',
        Icon: MdOutlineAssignment,
      },
      {
        id: 'cloud',
        title: 'Cloud Library',
        desc:
          'Unlimited cloud storage for resources and multimedia with intelligent organization and search.',
        Icon: IoMdCloudOutline,
      },
      {
        id: 'chat',
        title: 'Real-time Chat',
        desc:
          'Instant messaging, group discussions, and announcements to keep everyone connected.',
        Icon: FaRocketchat,
      },
      {
        id: 'analytics',
        title: 'Analytics Dashboard',
        desc:
          'Insights into learning progress, engagement metrics, and personalized recommendations.',
        Icon: VscGraphLine,
      },
      {
        id: 'mobile',
        title: 'Mobile Ready',
        desc:
          'Seamless experience across devices with responsive web design and mobile support.',
        Icon: FaMobileAlt,
      },
    ],
    []
  );

  return (
    <section id="features" className="w-full mb-20 mt-20 bg-[#e5f1ea] py-20 md:py-20 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-[#333333] mb-3 sm:mb-4">
          Why Learnova?
        </h2>
        <p className="text-center text-gray-700 text-base sm:text-lg mb-8 sm:mb-12 max-w-3xl mx-auto">
          Experience a comprehensive digital classroom with all the tools needed for effective learning and teaching.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map(({ id, title, desc, Icon: FeatureIcon }) => (
            <div
              key={id}
              className="bg-[#F5F1F1] hover:bg-[#ececec] rounded-2xl shadow-md p-5 sm:p-6 transition-all duration-300 hover:-translate-y-2"
            >
              <FeatureIcon className="text-3xl sm:text-4xl text-[#333333] mb-2 sm:mb-3" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">{title}</h3>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
