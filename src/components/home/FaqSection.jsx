import React, { useState, useMemo } from 'react';
import { CiCirclePlus, CiCircleMinus } from 'react-icons/ci';

function FaqSection() {
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
    <section id="faqs" className="w-full bg-[#F5F1F1] py-20 md:py-20 mt-10 scroll-mt-20">
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
            className="mb-4 text-[#333333] underline underline-offset-2 hover:opacity-80 ml-auto block mr-0 md:mr-4 font-semibold text-lg md:text-2xl text-right cursor-pointer"
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
                    className="w-full flex items-center justify-between text-left px-4 sm:px-6 py-4 sm:py-5 cursor-pointer"
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
  );
}

export default FaqSection;
