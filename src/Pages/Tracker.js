import React from "react";
import DashboardHeader from "../Components/DashboardHeader";
import styles from '../App.module.css'

const Tracker = ({toggle, toggleMenu, menuOpen}) => {
 return (
<>
<div>
  <DashboardHeader
  toggle = {toggle}
  toggleMenu = {toggleMenu}
  menuOpen={menuOpen}

  
  />  
  <div className= {styles.foodHeader}>
  <h1>Search for the food you ate today</h1>
  </div>
  <div className= {styles.cardContainer}>
  <div className= {styles.cards}>
    <h1>Sides</h1>
  </div>
  <div className= {styles.cards}>
    <h1>Desserts</h1>
  </div>
  <div className= {styles.cards}>
    <h1>Breakfast</h1>
  </div>
  <div className= {styles.cards}>
    <h1>Lunch</h1>
  </div>
  <div className= {styles.cards}>
    <h1>Dinner</h1>
  </div>
</div>
</div>
</>
 )
}

export default Tracker