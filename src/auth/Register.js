import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Register() {
    const url = 'http://expectoo.test/api/user/register';
    const navigate = useNavigate();
    const submitRegisterForm = (event) => {
        event.preventDefault();
        const email = document.querySelector('#email');
        const name = document.querySelector('#name');
        const pwd = document.querySelector('#password');
        const pwdc = document.querySelector('#password_confirmation');
        if (email.value.length === 0){
            alert('Email is required')
            return;
        }
        if (name.value.length === 0){
            alert('Name is required')
            return;
        }
        if (pwd.value.length === 0 && pwd.value !== pwdc.value ){
            alert('Pwd is required and must match with confirmtion pass')
            return;
        }
        const formElement = document.querySelector('#registerForm');
        const formData = new FormData(formElement);
        const formDataJSON = Object.fromEntries(formData);
        const btnPointer = document.querySelector('#login-btn');
        btnPointer.innerHTML = 'Please wait..';
        btnPointer.setAttribute('disabled', true);
        axios.post(url, formDataJSON).then((response) => {
            console.log(response.data)
            btnPointer.innerHTML = 'Register';
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
                    <form id='registerForm'>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name"
                                   placeholder="John Doe" name='name' required />
                        </div>
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
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Password Confirmation</label>
                            <input type="password" className="form-control" id="password_confirmation"
                                   placeholder="Your password" name='password_confirmation' required />
                        </div>
                        <button className="btn btn-success rounded-3" type='submit' id='register-btn'
                                onClick={ submitRegisterForm }>
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
export default Register
