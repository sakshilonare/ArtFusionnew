import React , {useState} from 'react'
import "./Register.css"
import { NavLink, useNavigate } from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate();
    const [user,setUser] = useState({
        name:"",email:"",pass:"",cpass:"",user_Desc:"",ph_n:""
    })

    let name,value
    const handleInputs = (e) => {
        name = e.target.name;
        value= e.target.value;

        setUser({...user, [name]:value}) //takes in dynamic data from the input
    }

    const PostData = async (e) => {
        e.preventDefault();

        const {name,email,pass,cpass} =user
        const res = await fetch("https://artfusionbackend.onrender.com/register", {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                
            },
            body: JSON.stringify({
                name,email,pass,cpass
            })
        });
        const data = await res.json();
        console.log(res);
        // if (res.status === 200) {
        //     const data = await res.json();
        // }
        if(res.status === 400 || !data){
            window.alert("Invalid Reg")
        }else{
            window.alert("Successful Reg")
            navigate("/login")
        }

    }


  return (
    
    <>
    <div className="bg-img">
        <section className="content">
                        <header className="form-title">Sign in</header>
                            <form method="POST" className="register-form" id="registerForm"> 
                                <div className="field">
                                    <label htmlFor="name">
                                    <span class="fa fa-user"></span>
                                    </label>
                                    <input type="text" name='name' id='name' 
                                        value={user.name}
                                        onChange={handleInputs}
                                        placeholder='Your Name'
                                    />
                                </div>
                                <div className="field space">
                                    <label htmlFor="email">
                                    <span class="fa fa-envelope"></span>
                                    </label>
                                    <input type="email" name='email' id='email' 
                                    value={user.email}
                                    onChange={handleInputs}
                                    placeholder='Your Email'/>
                                </div>
                                <div className="field space">
                                    <label htmlFor="pass">
                                    <span class="fa fa-lock"></span>
                                    </label>
                                    <input type="password" name='pass' id='pass' 
                                    value={user.pass }
                                    onChange={handleInputs}
                                    placeholder='Enter Password'/>
                                </div>
                                <div className="field space">
                                    <label htmlFor="cpass">
                                    <span class="fa fa-key"></span>
                                    </label>
                                    <input type="password" name='cpass' id='cpass' 
                                    value={user.cpass }
                                    onChange={handleInputs}                                    
                                    placeholder='Re-Enter Password'/>
                                </div>
                                <div className="field space">
                                    <label htmlFor="User_desc">
                                    <span class="fa fa-book"></span>
                                    </label>
                                    <input type="text" name='user_Desc' id='user_Desc' 
                                        value={user.user_Desc}
                                        onChange={handleInputs}
                                        placeholder='Write about yourself'
                                    />
                                </div>
                                <div className="field space">
                                    <label htmlFor="ph_n">
                                    <span class="fa fa-phone"></span>
                                    </label>
                                    <input type="text" name='ph_n' id='ph_n' 
                                        value={user.ph_n}
                                        onChange={handleInputs}
                                        placeholder='Contact'
                                    />
                                </div>
                                {/* <div>
                                    <label> Attach Photo:</label>
                                    <input
                                    type="file"
                                    name="file"
                                    onChange={handleFileChange}
                                    />
                                </div> */}
                                <div className="field">
                                <input type="submit" name='register' id='register' value= "Sign In"
                                onClick={PostData}
                                />
                                </div>
                                    <div className="log-in">Already registered? <NavLink to="/login">Log in</NavLink></div>
                                    <div className="log-in">Return to <NavLink to="/">Home</NavLink></div>
                            </form>
        </section>
        </div>
    </>
  )
}

export default Register