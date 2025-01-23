import logo from './logo.svg';
import styles from '../src/App.module.css'
import SignUp from './Pages/Sigup';
import axios from 'axios';
import { use, useState } from 'react';
import { Link, Route, Router, Routes } from 'react-router-dom';
import {auth, googleProvider, signInWithPopup} from '../src/Services/firebase'
import Login from '../src/Pages/Login'
import Dashboard from './Pages/Dashboard';
import Tracker from './Pages/Tracker';
import Sides from './Pages/Sides';
function App() {



  const [steps, nextSteps] = useState(1)
  const [signUpData, setSignUpData] = useState({
   email: "",
   password: "",
   age: "",
   height: "",
   weight: "",
   preferences: ""
  })


  const [menuOpen, setMenuOpen] = useState(false);

  
  const [toggle, setToggle] = useState(false)


  const [selectedValue, setSelectedValue] = useState("")


  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })

  const [errors, setErrors] = useState({})


  const handleGoogleSignIn = async () => {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const token = await result.user.getIdToken();
        const response = await fetch("http://localhost:8000/auth/google/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });
        const data = await response.json();
        console.log("Backend Response:", data);
        
        if (data.is_first_time_login) {
          // Handle first-time login, e.g., redirect to a setup page or show a welcome message
          window.location.href = "/Setup";
        } else {
          window.location.href = "/Dashboard";  // Normal redirect to the dashboard
        }
    
      } catch (error) {
        console.error("Error signing in with Google:", error);
      }
    };


    const handleSelectedValue = (e) => {
      setSelectedValue(e.target.value)
    }


    const handleSignIn = async (e) => {
      e.preventDefault()
      if(steps == 1){
        try {
          const response = await axios.post("http://localhost:8000/api/login/", {
            email: loginData.email,
          });

          console.log(response.data)
          nextSteps(step => step + 1)
    
        } catch(error){
          console.log('this did not work', error)
          }

        } else if(steps == 2){
            try {
              const response = await axios.post("http://localhost:8000/api/validate_user/", {
                email: loginData.email,
                password: loginData.password
              });
    
              console.log(response.data)
              window.location.href = "/Dashboard"
        
            } catch(error){
              console.log('this did not work', error)
              }
            }
          }

          const toggleMenu = () => {
            setMenuOpen((prev) => !prev);
          };
        


    const handleSignUp = async (e) => {
      e.preventDefault();
    
      if (steps === 1) {
        try {
          const response = await axios.post("http://localhost:8000/api/register_email/", {
            email: signUpData.email,
          });
    
          console.log(response.data); // Logs success data
          nextSteps(next => next + 1); // Moves to step 2 (steps will be incremented by 1)
          console.log(steps)
        } catch (error) {
          setErrors(error.response?.data || { general: 'Registration failed' });
          console.log('This did not work!', error);
        }
    
       } else if (steps === 2) {
        try {
          const response = await axios.post("http://localhost:8000/api/register_details/", {
            email: signUpData.email,
            password: signUpData.password,
          });
    
          console.log(response.data); // Logs success data
          nextSteps(steps + 1); // Moves to step 3
          console.log(steps)
        } catch (error) {
          setErrors(error.response?.data || { general: 'Details registration failed' });
          console.log('This does not work', error);
        }
      } else if (steps === 3) {
        try {
          const response = await axios.post("http://localhost:8000/api/register_profile/", {
            email: signUpData.email,
            password: signUpData.password,
            age: signUpData.age,
            height: signUpData.height,
            gender: signUpData.gender,
            preferences: signUpData.preferences

          });
    
          console.log(response.data); // Logs success data
          window.location.href = "/"
          nextSteps(1)
        } catch (error) {
          setErrors(error.response?.data || { general: 'Details registration failed' });
          console.log('This does not work', error);
          console.log(error.response.data)
        }

      }
    };
  const handleNext = () => {
    nextSteps(steps + 1)
  }

  const handleBack = () => {
    nextSteps(steps - 1);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({ ...signUpData, [name]: value });
};


const handleProfileChange = (e) => {
  const { name, value } = e.target;
  setSignUpData({ ...signUpData, [name]: value });
}

const handleLoginChange = (e) => {
  const { name, value } = e.target;
  setLoginData({ ...loginData, [name]: value }); // Fix here: use loginData
};

const logout = async () => {
  try {
      const response = await axios.post('http://localhost:8000/api/logout/', {}, {
          headers: {
              'Authorization': `Token ${localStorage.getItem('token')}`,
          },
      });
      console.log(response.data);
      // Clear token and redirect to login page
      localStorage.removeItem('token');
      window.location.href = '/login';
  } catch (error) {
      console.error("Error logging out:", error.response);
  }
};

  return (
    <div className="App">

<Routes>
      <Route  path = "/" element= {
        <Login
        handleNext={handleNext}
        steps = {steps}
        data = {loginData}
        handleChange = {handleLoginChange}
        handleLogin = {handleSignIn}
        handleGoogleSignIn = {handleGoogleSignIn}
        />
      }

      />

<Route  path = "/SignUp" element= {
          

          <SignUp
          handleNext={handleNext}
          steps = {steps}
          data = {signUpData}
          selectedValue = {selectedValue}
          handleSelectedValue = {handleSelectedValue}
          handleChange = {handleChange}
          handleSignUp = {handleSignUp}
          handleProfileChange = {handleProfileChange}
          handleGoogleSignIn = {handleGoogleSignIn}
          />
      }

      />

<Route path = "/Dashboard" element = {
  <Dashboard 
  logout = {logout}
  toggle = {toggle}
  toggleMenu = {toggleMenu}
  menuOpen = {menuOpen}

  />
}

/>

<Route path = "/Tracker" element = {
  <Tracker 
  toggle = {toggle}
  toggleMenu = {toggleMenu}
  menuOpen = {menuOpen}
  />
}

/>

<Route path = '/Sides' element = {
  <Sides />

}

/>

      </Routes>
   
    </div>
  );
}

export default App;
