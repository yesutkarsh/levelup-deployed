"use client";
import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation'; // or 'next/router' if using Pages Router

const BookingSuccessCard = ({ onClose, bookingDetails }) => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  // Countdown state update
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Redirect when countdown reaches zero
  useEffect(() => {
    if (countdown <= 0) {
      // Close the modal (unmount it)
      onClose && onClose();
      // Navigate to the Dashboard page
      router.push('/Dashboard');
    }
  }, [countdown, router, onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-8 z-[1000]">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md mx-auto text-center space-y-4 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          ×
        </button>

        <Script 
          src="https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs" 
          type="module" 
          strategy="beforeInteractive"
        />

        <dotlottie-player
          src="https://lottie.host/8eb66c90-a834-49ca-8f97-7cc356058b42/8akhWWMwiD.lottie"
          background="transparent"
          speed="1"
          loop="false"
          autoplay
          className="w-64 h-64 mx-auto"
        />

        <h2 className="text-2xl font-bold text-black">Booking Successful!</h2>
        <p className="text-gray-600">Your peer programming session has been scheduled.</p>
        
        <div className="bg-gray-50 rounded-lg p-4 text-left space-y-2">
          <p><span className="font-medium">Date:</span> {bookingDetails?.schedule?.date}</p>
          <p><span className="font-medium">Time:</span> {bookingDetails?.schedule?.time}</p>
          <p><span className="font-medium">Topic:</span> {bookingDetails?.topic?.type}</p>
          {bookingDetails?.group_or_solo === 'group' && (
            <p><span className="font-medium">Group Size:</span> {bookingDetails?.group_members?.length + 1} members</p>
          )}
        </div>

        <p className="text-gray-500 italic">
          Redirecting to Dashboard in {countdown > 0 ? countdown : 0} second{countdown !== 1 && 's'}...
        </p>

        <button
          onClick={onClose}
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BookingSuccessCard;
