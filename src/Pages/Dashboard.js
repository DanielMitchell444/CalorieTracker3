import React, { useState } from "react";
import styles from '../App.module.css';
import DashboardHeader from "../Components/DashboardHeader";
import DaysOfWeek from "../Components/Days";
import ProgressBar from "../Components/ProgressBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faPerson } from "@fortawesome/free-solid-svg-icons";
import Calendar from "../Components/Calendar";

const Dashboard = ({ logout, toggle, toggleMenu, menuOpen }) => {
  const [progress, trackProgress] = useState(20);



  return (
    <>
      <DashboardHeader logout={logout} toggle={toggleMenu} menuOpen={menuOpen} />
      <div className={styles.dashboardContainer}>
       <h1>Daniel's here's food log</h1>
       <Calendar />
      </div>

     
    </>
    )
}

export default Dashboard