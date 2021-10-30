import React from "react";
import { Link } from "react-router-dom";

function Nav() {
    return (
    <nav style={{display: 'flex', justifyContent: 'space-between'}}>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/createprojectpage">Create New Project</Link>
        {/* <Link to="/register"><Register></Register></Link> */}
        </nav>
        );
    }
    
export default Nav;