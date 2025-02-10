"use client";
import { useState, useEffect } from "react";
import AuthCard from "../components/authScreen/AuthCard";
import { AuthToggle } from "../components/authScreen/context/authContext";
import Link from "next/link";
import { useContext } from "react";

const PremiumLanding = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const { authCard, toggleAuthCard } = useContext(AuthToggle);
  const bgImageUrl =
    "https://www.masaischool.com/blog/content/images/2023/03/Scholarship-distribution-3.JPG";

  useEffect(() => {
    const img = new Image();
    img.src = bgImageUrl;
    img.onload = () => setImageLoaded(true);
  }, [bgImageUrl]);

  return (
    <>
      {authCard && <AuthCard />}
      <div className="relative min-h-screen bg-black overflow-hidden">
        {/* Navbar */}
        <nav className="absolute top-0 z-50 w-full px-4 py-6 sm:px-8">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link href="/">
              <span className="text-white text-xl font-light tracking-[0.2em]">
                MASAI CONNECT
              </span>
            </Link>
          </div>
        </nav>

        {/* Background Image */}
        <div
          className={`fixed inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            imageLoaded ? "opacity-40" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${bgImageUrl})` }}
        />

        {/* Noise Overlay */}
        <div className="fixed inset-0 bg-noise opacity-50" />

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-20 pb-8">
          {/* Hero Section */}
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
              Elevate Your
              <span className="block mt-2 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                Potential
              </span>
            </h1>

            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed font-light">
              Experience excellence through our premium platform designed for
              those who demand nothing but the finest in personal development.
            </p>

            {/* CTA Button */}
            <div
              className="inline-block group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <button
                onClick={toggleAuthCard}
                className={`
                  relative overflow-hidden px-8 sm:px-12 py-3 sm:py-5 bg-white text-black 
                  rounded-full font-medium text-lg transition-all duration-500
                  hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]
                  ${isHovered ? "tracking-widest" : "tracking-wide"}
                `}
              >
                <span className="relative z-10">BEGIN YOUR JOURNEY</span>
                <div
                  className={`
                    absolute inset-0 bg-black transition-transform duration-500
                    ${isHovered ? "translate-y-0" : "translate-y-full"}
                  `}
                />
                <span
                  className={`
                    absolute inset-1 flex items-center justify-center text-white 
                    ${isHovered ? "translate-y-0" : "translate-y-full"}
                  `}
                >
                  SIGNUP
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Gradient */}
        <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent" />
      </div>
    </>
  );
};

export default PremiumLanding;