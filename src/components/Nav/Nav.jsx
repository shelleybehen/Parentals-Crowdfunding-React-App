import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css'

const Nav = () => {
    
    return (
        <nav>
        <div className='heading'>
            <Link className='logo' to='/aboutpage'>PARENTALS</Link>
        </div>

        <div className='nav-links'>
        <Link className='nav-link' to='/'>Home</Link>
        <Link className='nav-link' to='/login'>Login</Link>
        <Link className='nav-link' to='/users'>Create a User Account</Link>
        <Link className='nav-link' to='/createprojectpage'>Create a new Campaign</Link>
        </div>
        </nav>
        );
    }
    
export default Nav;