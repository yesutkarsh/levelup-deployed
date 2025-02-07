// components/Sidebar.js
'use client';
import { useState } from 'react';
import styles from './style.module.css';

const Sidebar = () => {
  const [activeOption, setActiveOption] = useState(0);

  const sidebarOptions = [
    { id: 0, label: 'Dashboard', icon: '📊' },
    { id: 1, label: 'Sessions', icon: '👤' },
    { id: 2, label: 'Availability', icon: '⚙️' },
    { id: 3, label: 'Events', icon: '❔' },
    { id: 4, label: 'Posts', icon: '❔' },
    { id: 5, label: 'Analytics', icon: '❔' },

  ];

  const handleOptionClick = (id) => {
    setActiveOption(id);
  };

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        {sidebarOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => handleOptionClick(option.id)}
            className={`${styles.option} ${activeOption === option.id ? styles.active : ''}`}
          >
            <span className={styles.icon}>
              {option.icon}
            </span>
            <span className={`${styles.label} ${activeOption === option.id ? styles.activeLabel : ''}`}>
              {option.label}
            </span>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;