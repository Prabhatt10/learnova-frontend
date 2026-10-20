import React from 'react';
import { Link } from 'react-router-dom';
import startLearningButton from '../../assets/startLearningbutton.svg';
import heroImage from '../../assets/hero1.svg';

function HeroSection() {
  return (
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
  );
}

export default HeroSection;
