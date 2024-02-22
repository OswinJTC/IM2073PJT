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
            console.error('登入失敗', response);

        }

    }catch(error){
        console.error('登入失敗', error);
    }
  }
  return (
    <div className='align-items-center'>

        <div className='pt-5'></div>
        <div className='pt-5'></div>

        <div className='login-title d-flex justify-content-center align-items-center'>
             <span>IM2073 WEB PROGRAMMING</span>
        </div>

        <div className='the-login-form'>
            <form>
                <div className='signin-text'>Sign In</div>
                <div className='pt-5'></div>

                <div className='login-input-row'>
                    <div className='login-username-input'>
                        <input
                            type="text"
                            placeholder="請輸入用戶名稱"
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
                            placeholder="請輸入密碼"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="log-in-button">
                    <button type="button" onClick={handleLogin}>馬上登入</button>
                </div>

                <div className="ask-to-signup-link">
                    還沒有帳號? <Link to="/Register">點我註冊</Link>
                </div>

            </form>

        </div>


    </div>
    
  )
}

export default Login