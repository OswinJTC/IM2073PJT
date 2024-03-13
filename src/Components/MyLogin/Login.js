import React, { useState,useEffect } from 'react';
import api from '../../api/axiosConfig';
import './Login.css';
import {useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = ({setIsLoggedIn, setLoggedUserName}) => {

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleLogin = async () =>{
    try{

        const response = await api.post("/userApi/userLogin", {
            name: name,
            password: password
        })

        if(response.status === 200){
            setIsLoggedIn(true);
            setLoggedUserName(name);
            navigate("/");
        }else{
            console.error('Failed to Login', response);

        }

    }catch(error){
        console.error('Failed to Login', error);
    }
  }
  return (
    <div className='align-items-center' style={{ 
        backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/024/234/837/original/cool-blue-purple-vibrant-gradient-background-water-color-overlay-neon-design-element-dreamy-unfocussed-holograph-luxury-texture-fluid-lights-minimal-digital-gradient-free-vector.jpg')`, 
        backgroundSize: 'cover', 
        height: '100vh',
        weight: '100wh',
        padding: '20px'
      }}>

        <div className='pt-5'></div>
        <div className='pt-5'></div>

        <div className='login-title d-flex justify-content-center align-items-center'style={{ fontSize: '36px' }}>
             <span style={{ fontFamily: 'Times New Roman' }}>The Ultimate Saunas Shop</span>
        </div>

        <div className='the-login-form'>
            <form>
                <div className='signin-text'>Sign In</div>
                <div className='pt-5'></div>

                <div className='login-input-row'>
                    <div className='login-username-input'>
                        <input
                            type="text"
                            placeholder="Please enter your username"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className='login-input-row'>
                    <div className='login-password-input'>
                        <input
                            type="password"
                            placeholder="Please enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className='pt-5'></div>
                <div className="log-in-button">
                    <button type="button" onClick={handleLogin}>Login</button>
                </div>

                <div className="ask-to-signup-link">
                    Not Registered Yet? <Link to="/Register">Click Here to Register</Link>
                </div>

            </form>

        </div>

        <footer style={{ 
        position: 'fixed',
        bottom: '0',
        right: '0',
        textAlign: 'right', 
        marginTop: '20px', 
        color: '#fff' 
        }}>
        IM2073 Web Programming
        </footer>
    </div>
    
  )
}

export default Login