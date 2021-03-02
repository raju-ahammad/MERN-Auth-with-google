import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import ActivationMail from './login/ActivationMail'
import EditUser from './login/EditUser'
import ForgotPassword from './login/ForgotPassword'
import Login from './login/Login'
import Register from './login/Register'
import ResetPassword from './login/ResetPassword'
import NotFound from './notification/NotFound'
import Profile from './profile/Profile'
const Body = () => {
    
    const auth = useSelector(state => state.auth)
    const { isLogged, isAdmin } = auth
    return (
        <section>
            <Switch>
                <Route path="/login" component={ isLogged ? NotFound : Login } exact />
                <Route path="/register" component={isLogged ? NotFound : Register } exact />
                <Route path="/forgot_password" component={ isLogged ? NotFound : ForgotPassword } exact />
                <Route path="/profile" component={ isLogged ? Profile : NotFound } exact />
                <Route path="/user/reset/:token" component={ isLogged ? NotFound : ResetPassword } exact />
                <Route path="/edit_user/:id" component={ isAdmin ? EditUser : NotFound } exact />
                <Route path="/user/activate/:activation_token" component={ ActivationMail } exact />
            </Switch>
        </section>
    )
}

export default Body
