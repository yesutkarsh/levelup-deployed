'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const newsUpdates = [
  {
    title: 'Where Innovation Meets Collaboration',
    description: 'CodeFusion 2025 brings together developers, engineers, and tech enthusiasts from around the globe to explore the latest trends in software development, emerging technologies.',
    image: 'https://www.masaischool.com/images/new-homepage/community/community8.webp',
    link: '#',
  },
  {
    title: 'InnovateX 2025',
    description: 'InnovateX 2025 is a premier global event aimed at bridging the gap between innovation and implementation. The event showcases transformative technologies in AI, robotics, blockchain, and renewable energy.',
    image: 'https://www.masaischool.com/images/new-homepage/community/community5.webp',
    link: '#',
  },
  {
    title: 'Masai Meet Up Delhi',
    description: 'InnovateX 2025 is a premier global event aimed at bridging the gap between innovation and implementation. The event showcases transformative technologies in AI, robotics, blockchain, and renewable energy.',
    image: 'https://www.masaischool.com/images/new-homepage/community/community4.webp',
    link: '#',
  },
  {
    title: 'Quantum Computing Explained',
    description: 'An easy breakdown of the complexities of quantum computing.',
    image: 'https://www.masaischool.com/images/new-homepage/community/community1.webp',
    link: '#',
  },
  {
    title: 'Cybersecurity in 2025',
    description: 'What to expect from cybersecurity advancements in the coming years.',
    image: 'https://source.unsplash.com/500x300/?cybersecurity',
    link: '#',
  },
  {
    title: '5G: The Future is Here',
    description: 'How 5G technology is set to transform connectivity.',
    image: 'https://source.unsplash.com/500x300/?5g',
    link: '#',
  },
  {
    title: 'Blockchain Beyond Crypto',
    description: 'Understanding the applications of blockchain technology.',
    image: 'https://source.unsplash.com/500x300/?blockchain',
    link: '#',
  },
  {
    title: 'Augmented Reality Innovations',
    description: 'See how AR is merging digital and physical experiences.',
    image: 'https://source.unsplash.com/500x300/?augmentedreality',
    link: '#',
  },
  {
    title: 'Space Tech Breakthroughs',
    description: 'New developments in space technology that are out of this world.',
    image: 'https://source.unsplash.com/500x300/?space',
    link: '#',
  },
  {
    title: 'Rise of No-Code Tools',
    description: 'Empowering users with modern no-code solutions.',
    image: 'https://source.unsplash.com/500x300/?nocode',
    link: '#',
  },
];

export default function NewsScroller() {
  // Reference for the draggable container.
  const scrollerRef = useRef(null);
  const [dragWidth, setDragWidth] = useState(0);

  useEffect(() => {
    if (scrollerRef.current) {
      setDragWidth(scrollerRef.current.scrollWidth - scrollerRef.current.offsetWidth);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-gray-900 mb-8 text-left"
        >
          News and Updates
        </motion.h1>
        
        <div className="overflow-hidden">
          <motion.div
            ref={scrollerRef}
            className="flex gap-6 pb-4 cursor-grab"
            drag="x"
            dragConstraints={{ right: 0, left: -dragWidth }}
          >
            {newsUpdates.map((news, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-80 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="relative h-48">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="object-cover w-full h-full"
                  />
                  {/* Optional subtle overlay effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black opacity-0 hover:opacity-30 transition-opacity duration-300"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800">{news.title}</h2>
                  <p className="text-gray-500 text-sm mt-2">{news.description}</p>
                  <motion.a
                    href={news.link}
                    className="inline-block mt-4 text-blue-600 font-medium text-xs border border-blue-600 rounded px-2 py-1 hover:bg-blue-600 hover:text-white transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                  >
                    Learn More
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
