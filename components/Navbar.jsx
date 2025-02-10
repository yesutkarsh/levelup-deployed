"use client";

import { Search, Bell } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useProfile } from '@/context/ProfileContext';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const { profileImage } = useProfile();

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // Mock search results - replace with actual search logic
    const mockResults = [
      { id: 1, title: 'Advanced Algorithms', type: 'Course' },
      { id: 2, title: 'Database Systems', type: 'Course' },
      { id: 3, title: 'Web Development', type: 'Resource' },
    ].filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchResults(mockResults);
    setShowResults(query.length > 0);
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <img
                className="h-8 w-auto"
                src="https://ai-public.creatie.ai/gen_page/logo_placeholder.png"
                alt="Logo"
                width={32}
                height={32}
              />
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="#"
                className="border-black text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link
                href="#"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                
              </Link>
              <Link
                href="#"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                
              </Link>
              <Link
                href="#"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="relative">
                
                
                {showResults && (
                  <div className="absolute mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    {searchResults.length > 0 ? (
                      <div className="py-2">
                        {searchResults.map((result) => (
                          <div
                            key={result.id}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          >
                            <div className="text-sm text-gray-900">{result.title}</div>
                            <div className="text-xs text-gray-500">{result.type}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="px-4 py-2 text-sm text-gray-700">
                        No results found
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="ml-4 flex items-center">
              <div className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src={profileImage}
                  alt="User"
                  width={32}
                  height={32}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}