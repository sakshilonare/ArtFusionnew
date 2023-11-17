import React, {useState, useEffect} from 'react'
import { NavLink , useNavigate} from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Login.css';
import Glogin from './Glogin';
import Glogout from './Glogout';
import {gapi} from 'gapi-script';


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [pass,setPass] = useState('')
    const [showPassword, setShowPassword] = useState(false); 
    const [details, setDetails] = useState(null);

    useEffect(()=>{
      const  CLIENT_ID='500603126216-u0j0q2gt5h54bi8ock9424bnfatjfvqv.apps.googleusercontent.com965232707450-80aq2nftg7ea2iusqjo2kqqv0q6pl57k.apps.googleusercontent.com';
      function start(){
         gapi.client.init({
            clientId:CLIENT_ID,
            scope:""
         })
      };
      gapi.load('client:auth2',start);
    });

    const loginUser = async (e) =>{
        e.preventDefault();

       const res = await fetch("https://artfusionback.onrender.com/login" , {
        method: "POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body:JSON.stringify({
            email,pass
        })
       });

       const data = await res.json()
       const resobj=data;
       console.log(resobj);
       setDetails(resobj);
       if(res.status === 400 || !data){
        window.alert("Invalid Credentials")
        }else{
         console.log("userToken : ")
         console.log(data.token);
         console.log(details);
         const userDetails=data;
         console.log(userDetails);
         localStorage.setItem('artToken', data.token);
            // window.alert("Successful Logged in")
            
           
            navigate("/UserHomePage");
            window.location.reload();
        }
        
    }

    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

  return (
    <>
    <div className="bg-img">
    <section className="content">
                    <header className="form-title">Log in</header>
                        <form method='POST' className="login-form" id="registerForm"> 
                            <div className="field">
                                <label htmlFor="email">
                                <span class="fa fa-envelope"></span>
                                </label>
                                <input type="email" name='email' id='email' autoComplete='off'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Your Email'/>
                            </div>
                            <div className="field space">
                                <label htmlFor="pass">
                                <span class="fa fa-lock"></span>
                                </label>
                                <input 
                                type={showPassword ? 'text' : 'password'}
                                name='pass' id='pass' autoComplete='off'
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}                                     
                                placeholder='Enter Password'
                                />
                                <button className="show" onClick={togglePasswordVisibility}>
                                {showPassword ? 'HIDE' : 'SHOW'}
                            </button>
                            </div>
                            <div className="field">
                                <input type="submit" name='login' id='login' 
                                value= "Log In"
                                onClick={loginUser}/>
                            </div>
                             <Glogin/>
                           {/* <Glogout/> */}
                            <div class="pass">
                            <a href="#">Forgot Password?</a>
                            </div>
                            <div className="signup">Not yet registered? <NavLink to="/register">Sign in</NavLink></div>
                            <div className="signup">Return to <NavLink to="/">Home</NavLink></div>
                        </form>
    </section>
    </div>
</>
  )
}


export default Login;
