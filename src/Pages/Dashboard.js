import React, { useState } from "react";
import styles from '../App.module.css'
import DashboardHeader from "../Components/DashboardHeader";
import DaysOfWeek from "../Components/Days";
import ProgressBar from "../Components/ProgressBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullseye } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
import { faPerson } from "@fortawesome/free-solid-svg-icons";
import Calendar from "../Components/Calendar";

const Dashboard = ({ logout, toggle, toggleMenu, menuOpen }) => {
  const [progress, trackProgress] = useState(20);



  return (
    <>
      <DashboardHeader logout={logout} toggle={toggleMenu} menuOpen={menuOpen} />
      <div className={styles.dashboardContainer}>
      <h1>Welcome Daniel </h1>
      <div className= {styles.cardContainer}>
      <div className= {styles.cards}>
        <div className= {styles.cardsWrapper}>

        <h1>Track Your Progress</h1>
        <p>Monitor your daily achievements and milestones</p>
        <FontAwesomeIcon

        icon = {faBullseye}
        className= {styles.icon}

        />
        </div>
        </div>
        <div className= {styles.cards}>
          <div className= {styles.cardsWrapper}>

      <h1>Set Your Calorie Goals</h1>

      <p>Define your calorie targets and stay on track.</p>

      <FontAwesomeIcon

icon = {faDumbbell}

className= {styles.icon}

/>
    </div>

    </div>

    <div className= {styles.cards}>

    <div className= {styles.cardsWrapper}>

<h1>Track Your Calories</h1>

<p>Log your meals and maintain a balanced diet.</p>

<FontAwesomeIcon

icon = {faDumbbell}

className= {styles.icon}

/>
</div>
      </div>
    </div>

    </div>
       

     
    </>
    )
}

export default Dashboard