import axios from 'axios';
import React, { useState } from 'react';
import { showErrorMessage, showSuccessMessage } from '../notification/Notification';
import { isEmail } from '../notification/Validate';

const style = { 
    marginLeft:"5px", 
    background:"green",
    color: "white",
    border: "none",
    padding: "5px 10px"
}

const initialState = {
    email: "",
    err: "",
    success: ""
}

const ForgotPassword = () => {
    const [data, setData] = useState(initialState)

    const {email, err, success} = data;
    const handleEmailChange = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err: "", success: ""})
    }
    const handleForgotPassword = async () => {
        if (!isEmail(email)){
            return setData({...data, err: "Invalid email", success: ""})
        }
        try {
            const res = await axios.post('/user/forgotpassword', {email})
            return setData({...data, err: "", success: res.data.msg})
        } catch (err) {
            err.response.data.msg && setData({ ...data, err: err.response.data.msg, success: "" })
        }
    }

    return (
        <div className="container">
            <h1 className="text-center text info" >Forgot Your password</h1>     
            <div className="">
                { err && showErrorMessage(err) }
                { success && showSuccessMessage(success) }
                <div className="mt-4">
                    <label style={{ marginRight: "5px" }} htmlFor="email">Enter your Email Adress</label>
                    <input style={{ padding: " 5px 10px" }} type="email" name="email" id="email" value={email} onChange={handleEmailChange} />
                    <button style={style} onClick={ handleForgotPassword }>Varify Your Email</button>
                </div>
                
            </div>
        </div>
    )
}

export default ForgotPassword
