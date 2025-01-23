import React from 'react';
import styles from '../App.module.css';
import logo from '../Assets/logo.png';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DashboardHeader = ({ logout, toggle, menuOpen, toggleMenu }) => {
  return (
    <>
      <div className={styles.headerContainer}>
        <header className={styles.header}>
          <FontAwesomeIcon
            icon={faBars}
            className={styles.bars}
            onClick={toggle} // Toggle the menu on click
          />
        </header>
      </div>

      {/* Slide-out menu */}
      {menuOpen && (
        <div className={styles.slideOutMenu}>
          <ul>
            <li>
              <a href="/Dashboard">Dashboard</a>
            </li>
            <li>
              <a href="/Tracker">Tracker</a>
            </li>
            <li>
              <a href="/Settings">Settings</a>
            </li>
            <li>
              <button onClick={logout} className={styles.menuLogoutButton}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default DashboardHeader;
