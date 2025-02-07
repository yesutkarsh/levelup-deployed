"use client";
import React from 'react';
import styles from './banner.module.css';
import Link from 'next/link';
// import PeerProgrammingBookingCard from '../components/BookCard';

export default function BannerCard() {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <>
      {isOpen && (
        <PeerProgrammingBookingCard onClose={() => setIsOpen(false)} />
      )}
      <div className={styles.bannerCard}>
        <div>
          <h1>Book Pair Programming Sessions!</h1>
          <p>Book a session with a mentor and get your doubts cleared</p>
         <Link href="/Booksession">
          <button>
            Schedule Now <i className="ri-arrow-right-line"></i>
          </button>
         </Link>
        </div>
        <div>
          <img 
            src="https://hukumu.masaischool.com/assets/noInterviewsBannerIcon.svg" 
            alt="banner" 
          />
        </div>
      </div>
    </>
  );
}