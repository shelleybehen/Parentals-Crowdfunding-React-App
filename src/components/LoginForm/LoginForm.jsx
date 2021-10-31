import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LoginForm.css'

function LoginForm() {
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });
    const history = useHistory();
    
    const handleChange = (e) => {
        const { id, value } = e.target;
        setCredentials((prevCredentials) => ({
        ...prevCredentials,
        [id]: value,
        }));
    };
    
    const postData = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}api-token-auth/`,
            {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
            }
            );
            return response.json();
        };

    const handleSubmit = (e) => 
        {e.preventDefault();
        if (credentials.username && credentials.password){
        postData().then((response) => {
        window.localStorage.setItem('token', response.token);
        history.push('/');
        });
        }
    };
    return (
        <div className='login-page'>
            <div className='main'>
            <p className='sign' align='center'>Login</p>
            <form onSubmit={handleSubmit} className='form1'>
                <div>
                <input className='field' align='center' type='text' id='username' placeholder='Enter Username' onChange={handleChange} />
                </div>
                <div>
                <input className='field' align='center' type='password' id='password' placeholder='Password' onChange={handleChange} />
                </div>
                    <button className='submit' align='center' type='submit' onClick={handleSubmit}>Submit</button>
                </form>
            </div >
        </div>
    )
}
        
export default LoginForm;