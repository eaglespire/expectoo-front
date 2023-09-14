import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Login() {
    const url = 'http://expectoo.test/api/user/login';
    const navigate = useNavigate();
    const submitLoginForm = (event) => {
        event.preventDefault();
        const email = document.querySelector('#email');
        const pwd = document.querySelector('#password');
        if (email.value.length === 0){
            alert('Email is required')
            return;
        }
        if (pwd.value.length === 0){
            alert('Pwd is required')
            return;
        }
        const formElement = document.querySelector('#loginForm');
        const formData = new FormData(formElement);
        const formDataJSON = Object.fromEntries(formData);
        const btnPointer = document.querySelector('#login-btn');
        btnPointer.innerHTML = 'Please wait..';
        btnPointer.setAttribute('disabled', true);
        axios.post(url, formDataJSON).then((response) => {
            console.log(response.data)
            btnPointer.innerHTML = 'Login';
            btnPointer.removeAttribute('disabled');
            const data = response.data;
            const token = data.token;
            if (!token) {
                alert('Incorrect email/password.');
                return;
            }
            localStorage.clear();
            localStorage.setItem('user-token', token);
            setTimeout(() => {
                navigate('/');
                return window.location.href='/'
            }, 500);
        }).catch((error) => {
            alert(error)
            btnPointer.innerHTML = 'Login';
            btnPointer.removeAttribute('disabled');
            alert("Incorrect login details");
        })
    };
    return (
        <>
            <div className="row justify-content-center">
                <div className="col-12 col-lg-6">
                    <h1 className="text-center">Login</h1>
                    <form id='loginForm'>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email"
                                   placeholder="name@example.com" name='email' required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password"
                                   placeholder="Your password" name='password' required />
                        </div>
                        <button className="btn btn-success rounded-3" type='submit' id='login-btn'
                        onClick={ submitLoginForm }>
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
export default Login
