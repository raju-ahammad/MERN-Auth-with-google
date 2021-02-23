import React from 'react'
import { Link } from 'react-router-dom'
const Header = () => {
    return (
        <header className="nav">
            <div className="logo">
                <h1> <Link to="/" >Jobup</Link> </h1>
            </div>
            <div className="header-list">
                <ul>
                    <li> <Link to="/login" >Log in</Link> </li>
                    <li> <Link to="/signin" >Sign up</Link> </li>
                </ul>
            </div>
        </header>
    )
}

export default Header
