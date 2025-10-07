import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

import startLearningButton from '../assets/startLearningbutton.svg';
import heroImage from '../assets/hero1.svg';

import { PiVideoConference } from 'react-icons/pi';
import { MdOutlineAssignment } from 'react-icons/md';
import { IoMdCloudOutline } from 'react-icons/io';
import { FaRocketchat, FaMobileAlt } from 'react-icons/fa';
import { VscGraphLine } from 'react-icons/vsc';
import { CiCirclePlus, CiCircleMinus } from 'react-icons/ci';

function Home() {
  // Feature cards data (mapped into the grid)
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

  // FAQ data (mapped into the accordion)
  const faqs = useMemo(
    () => [
      {
        q: 'What is learnova?',
        a:
          'Learnova is a modern digital classroom platform for live teaching, assignments, content sharing, and collaboration.',
      },
      {
        q: 'Is it paid or free?',
        a:
          'The platform supports both free access for core features and optional paid tiers for advanced capabilities.',
      },
      {
        q: 'Is my data secure when I use learnova?',
        a:
          'Data is protected with role-based access, secure storage, and best-practice authentication for classroom workflows.',
      },
      {
        q: 'What is community?',
        a:
          'Community enables group discussions, announcements, and peer support spaces around courses and topics.',
      },
      {
        q: 'Is AI assistant free or paid?',
        a:
          'An AI assistant is available with a basic plan; premium plans may unlock additional automation and analytics.',
      },
    ],
    []
  );

  // Track which FAQ items are open (multiple open allowed)
  const [openSet, setOpenSet] = useState(new Set());
  const allOpen = openSet.size === faqs.length;

  const toggle = (idx) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const expandAll = () => setOpenSet(new Set(faqs.map((_, i) => i)));
  const collapseAll = () => setOpenSet(new Set());

  return (
    <div className="w-full bg-[#F5F1F1] font-[poppins]">

      <section className="w-full mb-20 py-5 bg-[#F5F1F1]">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16 gap-8 md:gap-10">
          <div className="max-w-xl space-y-4 sm:space-y-6">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#333333] leading-tight m-1 sm:m-2">
                Empower Learning
              </h1>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#333333] leading-tight">
                Anytime, Anywhere
              </h1>
              <div>
                <p className="font-medium text-base sm:text-lg md:text-xl text-[#333333] text-left mt-3 sm:mt-4">
                  Join a seamless, interactive digital classroom experience designed for the future of education. Connect, collaborate, and learn with cutting-edge tools.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <Link to="/login">
                  <div className="flex justify-center items-center cursor-pointer mt-5 sm:mt-6 bg-[#333333] px-4 sm:px-6 py-3 sm:py-4 rounded-md hover:scale-105 sm:hover:scale-110 transition-transform duration-200">
                    <img src={startLearningButton} alt="Start Learning" className="h-6 sm:h-7 md:h-8 w-auto" />
                    <div className="text-white font-medium text-base sm:text-lg ml-2">Start Learning</div>
                  </div>
                </Link>

                <Link to="/features">
                  <div className="ml-0 sm:ml-2 flex justify-center items-center cursor-pointer mt-5 sm:mt-6 px-8 sm:px-12 py-3 sm:py-4 border-2 border-[#333333] text-[#333333] rounded-md hover:scale-105 sm:hover:scale-110 transition-transform duration-200 text-base sm:text-lg">
                    Know More
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className="w-full max-w-sm sm:max-w-md md:max-w-lg">
            <img
              src={heroImage}
              alt="Hero"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </section>




      <section className="w-full mb-20 mt-20 bg-[#e5f1ea] py-20 md:py-20 ">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-[#333333] mb-3 sm:mb-4">
            Why LearnEx?
          </h1>
          <p className="text-center text-gray-700 text-base sm:text-lg mb-8 sm:mb-12 max-w-3xl mx-auto">
            Experience a comprehensive digital classroom with all the tools needed for effective learning and teaching.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map(({ id, title, desc, Icon }) => (
              <div
                key={id}
                className="bg-[#F5F1F1] hover:bg-[#ececec] rounded-2xl shadow-md p-5 sm:p-6 transition-all duration-300 hover:-translate-y-2"
              >
                <Icon className="text-3xl sm:text-4xl text-[#333333] mb-2 sm:mb-3" />
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">{title}</h2>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="w-full bg-[#F5F1F1] py-20 md:py-20 mt-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-start gap-6 md:gap-8">
          <div className="mb-4 md:mb-6">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#333333] leading-tight">
              Frequently <br className="hidden sm:block" /> Asked <br className="hidden sm:block" /> Questions
            </h2>
          </div>
          <div className="flex-1 w-full">
            <button
              type="button"
              onClick={allOpen ? collapseAll : expandAll}
              className="mb-4 text-[#333333] underline underline-offset-2 hover:opacity-80 ml-auto block mr-0 md:mr-4 font-semibold text-lg md:text-2xl text-right"
            >
              {allOpen ? 'Collapse all' : 'Expand all'}
            </button>

            <ul
              className="divide-y divide-gray-200 rounded-2xl bg-white shadow-sm"
              aria-label="Frequently Asked Questions"
            >
              {faqs.map((item, idx) => {
                const isOpen = openSet.has(idx);
                const headerId = `faq-header-${idx}`;
                const panelId = `faq-panel-${idx}`;
                return (
                  <li key={idx} className="p-0">
                    <button
                      id={headerId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggle(idx)}
                      className="w-full flex items-center justify-between text-left px-4 sm:px-6 py-4 sm:py-5"
                    >
                      <span className="text-base sm:text-lg font-semibold text-[#333333]">{item.q}</span>
                      {isOpen ? (
                        <CiCircleMinus className="text-xl sm:text-2xl text-[#333333]" />
                      ) : (
                        <CiCirclePlus className="text-xl sm:text-2xl text-[#333333]" />
                      )}
                    </button>

                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={headerId}
                      className={`px-4 sm:px-6 pb-4 sm:pb-5 text-gray-700 text-sm sm:text-base ${isOpen ? 'block' : 'hidden'}`}
                    >
                      {item.a}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
