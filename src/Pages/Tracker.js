import React from "react";
import DashboardHeader from "../Components/DashboardHeader";
import styles from '../App.module.css'

const Tracker = ({toggle, toggleMenu, menuOpen, meals, handleInput}) => {
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
  <div className= {styles.searchBar}>
   <input type = "search"

   onChange={handleInput}

   />
  {meals}

  </div>
</div>
</>
 )
}

export default Tracker