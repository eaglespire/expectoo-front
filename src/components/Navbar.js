import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";

export default function Navbar(){
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/');
        return window.location.href='/'
    }
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const checkUserToken = () => {
        const userToken = localStorage.getItem('user-token');
        if (!userToken || userToken === 'undefined') {
            setIsLoggedIn(false);
            return navigate('user/login');
        }
        setIsLoggedIn(true);
    }
    useEffect(() => {
        checkUserToken();
    }, [isLoggedIn]);
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-success navbar-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">Expectoo</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            { isLoggedIn ? (
                                <li className="nav-item">
                                    <Link className="nav-link" to="contact">Contacts</Link>
                                </li>
                            )  : null }

                        </ul>
                        <ul className='ms-auto navbar-nav'>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                   aria-expanded="false">
                                    Account
                                </a>
                                <ul className="dropdown-menu">
                                    { !isLoggedIn ? (
                                        <>
                                            <li><Link className="dropdown-item" to="user/login">Login</Link></li>
                                            <li><Link className="dropdown-item" to="user/register">Register</Link></li>
                                        </>
                                    ) : (<>
                                        <li><Link className="dropdown-item" to="#" onClick={logout}>Logout</Link></li>
                                    </>) }
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
