import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ActivationMail from './login/ActivationMail'
import Login from './login/Login'
import Register from './login/Register'

const Body = () => {
    return (
        <section>
            <Switch>
                <Route path="/login" component={ Login } exact />
                <Route path="/register" component={ Register } exact />

                <Route path="/user/activate/:activation_token" component={ ActivationMail } exact />
            </Switch>
        </section>
    )
}

export default Body
