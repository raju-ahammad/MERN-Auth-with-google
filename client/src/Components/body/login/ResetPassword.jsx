import axios from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { showErrorMessage, showSuccessMessage } from '../notification/Notification'
import { isLength, isMatch } from '../notification/Validate'



const initialState = {
    password: "",
    cf_password: "",
    err: "",
    success: ""
}

const ResetPassword = () => {
    const [data, setData] = useState(initialState)

    const {token} = useParams()

    const {password, cf_password, err, success} = data
    
    const passwordChange = e => {
        const {name, value} = e.target

        setData({...data, [name]:value, err: "", success: ""})

    }

    const handlePasswordReset = async () => {
        if (isLength(password)) 
            return setData({...data, err: "Password must be atleast 6 letter", success: ""}) 
               
        if (!isMatch(password, cf_password)) 
            return setData({...data, err: "Password did not match", success: ""})  
        try {
            const res = await axios.post('/user/resetpassword', {password}, {
                headers: {Authorization: token}
            })
            console.log(res);
            return setData({...data, err: '', success: res.data.msg})
        } catch (err) {
            err.response.data.msg && setData({...data, err: err.response.data.msg, success: ""})
            
        }    
    }
    return (
        <div className="container">
            <h1 className="text-center text info" >Reset  Your password</h1>     
            <div className="card" style={{ width: "50%" }}>
                { err && showErrorMessage(err) }
                { success && showSuccessMessage(success) }
                <div className="m-4">
                    <label style={{ marginRight: "5px" }} htmlFor="password">Password</label>
                    <input style={{ padding: " 5px 35px", marginLeft:"62px" }} type="password" name="password" id="password" value={password} onChange={ passwordChange } />
                </div>
                <div className="ml-4">
                    <label style={{ marginRight: "5px" }} htmlFor="cf_password">ConFirm Password</label>
                    <input style={{ padding: " 5px 35px" }} type="password" name="cf_password" id="cf_password" value={cf_password} onChange={ passwordChange } />
                </div>
                <button className="btn btn-lg btn-success m-4" onClick={ handlePasswordReset }>Reset Password</button>
            </div>
        </div>
    )
}

export default ResetPassword
