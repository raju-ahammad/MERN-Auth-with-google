import axios from 'axios'
import React, { useState } from 'react'
import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { disPatchLogin } from '../../redux/Actions/authActions'
import { showErrorMessage, showSuccessMessage } from '../notification/Notification'



const initialState = {
    email: "",
    password: "",
    err: "",
    success: ""
}

const Login = () => {
    const [user, setUser] = useState(initialState)
    const dispatch = useDispatch()
    const history = useHistory()
    const { email, password, err, success } = user

    const userHandleChange = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name]:value, err: "", success:""})
        console.log(user);
    }

    const onHandleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('/user/login', {email, password})
            setUser({...user, err: "" ,success: res.data.msg})

            localStorage.setItem('firstLogin', true)
            dispatch(disPatchLogin())
            history.push("/")
            
        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ""})
        }
    }

    const responseGoogle = async (response) => {
        try {
            const res = await axios.post('/user/google_login', {tokenId: response.tokenId})

            setUser({...user, error:'', success: res.data.msg})
            localStorage.setItem('firstLogin', true)

            dispatch(disPatchLogin())
            history.push('/')
        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }
      

    return (
        <div className="mt-1">
    <div className="container">
      <div className="card" style={{margin: "auto", width: "650px"}}>
       
        <div className=" text-center">
          <h2 className="text-dark">Log in</h2>
        </div>
        { err && showErrorMessage(err) }
        { success && showSuccessMessage(success) }
        <form className="form p-4" onSubmit={ onHandleSubmit } >
        <div className="form-group row">
            <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
                <input onChange={userHandleChange} type="email" value={email} name="email" className="form-control" id="email" placeholder="Email" />
            </div>
        </div>

        <div className="form-group row">
            <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
                <input onChange={userHandleChange} type="password" value={password} name="password" className="form-control" id="password" placeholder="Password" />
            </div>
        </div>
        <div className="d-flex justify-content-md-between">
            <button type="submit" className="btn btn-dark btn-lg px-5  m-auto">Submit</button>
            <h6> <Link to="/forgot_password">Forgot password</Link> </h6>
        </div>
        </form>
        <div className="d-flex flex-column align-items-center">
            <h5 className="text-center">Or login with</h5>
            <div className=" btn ">
            <GoogleLogin
                    clientId="292133382625-le00gese8sfqu86nr2icsptpqhkjced5.apps.googleusercontent.com"
                    buttonText="Login with google"
                    onSuccess={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
        </div>
        <h5> Don't have Account ? <Link to="/register"> Register </Link> </h5>
      </div>
    </div>
  </div>
    )
}

export default Login
