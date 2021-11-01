import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import './RegisterForm.css'

const RegisterForm= () => {
    // const history = useHistory ();
    
    const startingValues = {
        username: '',
        email: '',
        password: ''
    }
    const [userInfo, setUserInfo] = useState(startingValues)

    const handleChange = (event) => {
        const { id, value } = event.target;
        setUserInfo((prevUser) => {
        return {
            ...prevUser,
            [id]: value,
            };
        });
    };
  
    const postData = async () => {
    console.log('Im posting a user to your API');
    setUserInfo(startingValues)
    const response = await fetch(
        `${process.env.REACT_APP_API_URL}users/`,
        {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(userInfo),
        }
        );
        return response.json();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postData().then((response) => {
            console.log('response from our API --------', response);
        });
    };
        
    return (
        <div className="user-page">
            <div className="user-form">
                <p className="sign3" align="center">Create a User Account</p>
        <form className="form3">
        <div>
            <input value={userInfo.username} className="field3"  align="center" type="text" id="username" placeholder="Enter Username" onChange={handleChange} />
        </div>
        <div>
            <input value={userInfo.email} className="field3"  align="center" type="text" id="email" placeholder="Enter Email" onChange={handleChange} />
        </div>
        <div>
    <input value={userInfo.password} className="field3"  align="center" type="password" id="password" placeholder="Password" onChange={handleChange} />
        </div>
        <div>
            <button className="submit2" align="center" type="submit" onClick={handleSubmit}>Submit</button>
        </div>
        </form>
        </div>
        </div>
  );
};

export default RegisterForm;