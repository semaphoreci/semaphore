import React from 'react';
import styles from './styles.module.css';

const FlashyCard = ({ icon, title, description, linkText, linkUrl }) => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.iconContainer}>
          {icon ? (
            <div className={styles.icon}>{icon}</div>
          ) : (
            <svg className={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
        <div className={styles.textContent}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
          <a href={linkUrl} className={styles.link}>
            {linkText}
            <svg className={styles.arrow} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FlashyCard;
