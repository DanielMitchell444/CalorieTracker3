
import styles from '../App.module.css'
import logo from '../Assets/logo.png'

import { Link } from 'react-router-dom'
const Login = ({steps, data, handleLogin, handleChange}) => {

 return(
  <>
<div className= {styles.wrappedContainer}>
<div className= {styles.logoStuff}>
  <img src = {logo} className= {styles.logo} />
  </div>
<div className =  {styles.containerSignUp}>
  
 <div className= {styles.content}>
   <h1>Welcome Back!</h1>
   </div>
   <form 
   className= {styles.form}
   onSubmit={handleLogin}
   >
    {steps === 1 && (
    <>
    <div className= {styles.inputFields2}>
      <input type = "email" 
      placeholder="Enter Email"
       required 
       name = "email"
       value = {data.email}
       onChange={handleChange}
       />
    </div>
    <div className= {styles.inputFields}>
      <input type = "submit" value= "Continue" 
      className= {styles.login}
      />
    </div>
    <div className= {styles.account}>
        <p>Don't have an account? 
         <Link to = "/Signup">Signup</Link>
          
          </p>
      </div>
      <div className= {styles.or}>
        <hr className= {styles.thing}></hr>
        <h2>Or</h2>
        <hr className= {styles.thing}></hr>
      </div>
      <div className= {styles.alternativeSignIn}>
        <button type = "button"
        className= {styles.googleSignInButton}
        >
       Sign in with Google
        </button>
        <button type = "button"
        className= {styles.microsoftSignInButton}
        >
         Sign in with Microsoft
        </button>
        <button type = "button"
        className= {styles.googleSignInButton}
        >
         Sign in with Memes
        </button>
      </div>
      </>
    )}

{steps === 2 && (
  <>
    <div className={styles.step2FieldsWrapper}>
      <div className={styles.inputFields2}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={data.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.inputFields2}>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={data.password}
          onChange={handleChange}
          required
        />
      </div>
    </div>
    <div className={styles.inputFields}>
      <input
        type="submit"
        value="Continue"
        className={styles.login}
      />
    </div>

    <div className={styles.inputFields}>
      <button
       type="submit"
       value="Go Back"
       className={styles.login3}
      >Go Back</button>
    </div>
   
    <footer>
      <a href="">Terms of Service</a>
      <hr />
      <a href="">Privacy Policy</a>
    </footer>
  </>
)}


    
   </form>
 </div>

</div>
</>
 )
}

export default Login