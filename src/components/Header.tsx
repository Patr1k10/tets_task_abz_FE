'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/header.module.css';


const Header: React.FC = () => {



  return (
    <header className={styles.header}>
      <h1>Next.js </h1>
      <nav>
        <Link href="/users">
          <span className={styles.navLink}>Users</span>
        </Link>
        <Link href="/token">
          <span className={styles.navLink}>Token</span>
        </Link>
        <Link href="/positions">
          <span className={styles.navLink}>Positions</span>
        </Link>
        <Link href="/registration">
          <span className={styles.navLink}>Registration</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
