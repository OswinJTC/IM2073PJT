import React, { useState,useEffect } from 'react';
import api from '../../api/axiosConfig';
import './Register.css';
import {useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = ({setIsLoggedIn, setLoggedUserName}) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleRegister = async () => {
    // Email validation regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Check if the email is in a valid format
    if (!emailPattern.test(email)) {
      console.error('Invalid email address');
      return; // Exit the function if email is invalid
    }
  
    try {
      const response = await api.post("/userApi/userRegistration", {
        name: name,
        email: email,
        password: password
      });
  
      if (response.status === 201) {
        console.log('Registration successful!');
        navigate("/");
      } else {
        console.error('Failed to Register', response);
      }
  
    } catch (error) {
      console.error('Failed to Register', error);
    }
  }
  


  return (
    <div  className='align-items-center' style={{ 
      backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/024/234/837/original/cool-blue-purple-vibrant-gradient-background-water-color-overlay-neon-design-element-dreamy-unfocussed-holograph-luxury-texture-fluid-lights-minimal-digital-gradient-free-vector.jpg')`, 
      backgroundSize: 'cover', 
      height: '100vh',
      weight: '100wh',
      padding: '20px'
    }} className='align-items-center'>

        <div className='pt-5'></div>
        <div className='pt-5'></div>

        <div className='login-title d-flex justify-content-center align-items-center'style={{ fontSize: '36px' }}>
             <span style={{ fontFamily: 'Times New Roman' }}>The Ultimate Saunas Shop</span>
        </div>

        <div className='the-register-form'>
            <form>
                <div className='signup-text'>Sign Up</div>
                <div className='pt-5'></div>

                <div className='register-input-row'>
                    <div className='register-username-input'>
                        <input
                            type="text"
                            placeholder="Please enter your username"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className='register-input-row'>
                    <div className='register-email-input'>
                        
                        <input
                            type="email"
                            placeholder="Please enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className='register-input-row'>
                    <div className='register-password-input'>
                        <input
                            type="password"
                            placeholder="Please enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="register-button">
                    <button type="button" onClick={handleRegister}>Register</button>
                </div>

                <div className="ask-to-signin-link">
                    Already Registered?    <Link to="/">Click Here to Login</Link>
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

export default Register