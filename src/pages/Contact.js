import React, { useEffect, useState } from "react";
import { Route, useNavigate } from "react-router-dom";
const Contact = (props) => {

    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('user/login');
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
        <React.Fragment>
            <h1>Contact Page</h1>
        </React.Fragment>
    );
}
export default Contact;
