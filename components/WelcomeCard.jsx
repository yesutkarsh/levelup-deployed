"use client";
import { useRef } from "react";
import { useProfile } from "@/context/ProfileContext";
import Link from "next/link";

export default function WelcomeCard({name, status}) {
  const fileInputRef = useRef(null);
  const { profileImage, setProfileImage } = useProfile();

  const handleImageClick = ({name, status}) => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center space-x-4">
        <button onClick={handleImageClick} className="relative group">
          <img
            className="h-16 w-16 rounded-full object-cover"
            src={profileImage}
            alt="Profile"
            width={64}
            height={64}
          />
          <div className="absolute inset-0 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
            <span className="text-white opacity-0 group-hover:opacity-100 text-xs">
              Change
            </span>
          </div>
        </button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleImageChange}
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome back, {name}
            <span className="text-sm text-gray-500 ml-2">{status}</span>
          </h2>
          <Link href={"/profile"}>
          <p className="text-gray-500 underline"><i className="ri-pencil-fill"></i>Edit You Profile</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
