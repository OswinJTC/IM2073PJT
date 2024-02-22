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


  const handleRegister = async () =>{
    try{

        const response = await api.post("/userApi/userRegistration", {
            name: name,
            email: email,
            password: password
        })

        if(response.status === 201){
            console.log('Registration successful!');
            navigate("/");
        }else{
            console.error('註冊失敗', response);
        }

    }catch(error){
        console.error('註冊失敗', error);
    }
  }
  return (
    <div className='align-items-center'>

        <div className='pt-5'></div>
        <div className='pt-5'></div>

        <div className='login-title d-flex justify-content-center align-items-center'>
             <span>IM2073 WEB PROGRAMMING</span>
        </div>

        <div className='the-register-form'>
            <form>
                <div className='signup-text'>Sign Up</div>
                <div className='pt-5'></div>

                <div className='register-input-row'>
                    <div className='register-username-input'>
                        <input
                            type="text"
                            placeholder="請輸入用戶名稱"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className='register-input-row'>
                    <div className='register-email-input'>
                        <input
                            type="text"
                            placeholder="請輸入電子郵件"
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
                            placeholder="請輸入密碼"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="register-button">
                    <button type="button" onClick={handleRegister}>馬上註冊</button>
                </div>

                <div className="ask-to-signin-link">
                    已經有帳號? <Link to="/">點我登入</Link>
                </div>

            </form>

        </div>


    </div>
    
  )
}

export default Register