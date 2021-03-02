import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


const Header = () => {
    const auth = useSelector(state => state.auth)
    const { user, isLogged } = auth

    const handleLogout = async () => {
        try {
            await axios.get('user/logout')
            localStorage.removeItem('firstLogin')
            window.location.href="/"
        } catch (err) {
            window.location.href="/"
        }
    }

    let img = user.avator
    return (
        <header className="">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/"><h2>Jobup</h2></Link>
            <div className=" navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <Link className="nav-link" to="/">Home </Link>
                </li>
                
                </ul>
                {
                    isLogged 
                    ? <div className='d-flex' >
                        <Link className="nav-link" to="/profile"> { user.name }  <img style={{ width: '25px' }} src={img} alt=""/>  </Link>
                        <Link className="nav-link" to="/" onClick={ handleLogout }>Logout</Link>
                    </div>
                    : <div className='d-flex'>
                        <Link className="nav-link" to="/login">Login</Link>
                        <Link className="nav-link" to="/register">Sgin Up</Link>
                    </div>
                }
                
                
            </div>
            </nav>
                        
        </header>
    )
}

export default Header
