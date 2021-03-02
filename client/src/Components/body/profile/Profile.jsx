import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { dispatchGetAllUsers, fetchAllUsers } from '../../redux/Actions/usersAction'
import { showErrorMessage, showSuccessMessage } from '../notification/Notification'
import { isLength, isMatch } from '../notification/Validate'


const initialState = {
    name: "",
    password: "",
    cf_password: "",
    err: "",
    success: ""
}

const Profile = () => {
    const [data, setData] = useState(initialState)
    const [avator, setAvator] = useState(false)
    const [loading, setLoading] = useState(false)
    const [callback, setCallback] = useState(false)

    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)
    const users = useSelector(state => state.users)
    console.log(users);
    const { user, isAdmin } = auth
    const {name, password, cf_password, err, success} = data

    useEffect(() => {
        if (isAdmin) {
            fetchAllUsers(token).then(res => {
                dispatch(dispatchGetAllUsers(res))
            })
        }
    }, [token, isAdmin, dispatch, callback])

   
    const handleChange = (e) => {
        const {name, value } = e.target

        setData({...data, [name]:value, err: "", success:""})
    }

    const changeAvatar = async(e) => {
        e.preventDefault()
        try {
            const file = e.target.files[0]
            console.log("File", file);

            if(!file) return setData({...data, err: "No files were uploaded." , success: ''})

            if(file.size > 1024 * 1024)
                return setData({...data, err: "Size too large." , success: ''})

            if(file.type !== 'image/jpeg' && file.type !== 'image/png')
                return setData({...data, err: "File format is incorrect." , success: ''})

            let formData =  new FormData()
            formData.append('file', file)
            console.log(formData);

            setLoading(true)
            const res = await axios.post('/api/upload', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })
            console.log(res);

            setLoading(false)
            setAvator(res.data.url)
            
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }

    const updateInfo = () => {
        try {
            axios.patch('/user/update', {
                name: name ? name : user.name,
                avator: avator ? avator : user.avator
            },
            {
                headers: {Authorization: token}
            })

            setData({...data, err: "", success: "Updated success !"})

        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ""})
        }
    }

    const updatePassword = () => {
        if (isLength(password)) 
            return setData({...data, err: "Password must be atleast 6 letter", success: ""}) 
               
        if (!isMatch(password, cf_password)) 
            return setData({...data, err: "Password did not match", success: ""})  
        try {
            axios.patch('/user/resetpassword', { password },
            {
                headers: {Authorization: token}
            })

            setData({...data, err: "", success: "Updated success !"})

        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ""})
        }
    }

    const handleUpdate = () => {
        if (name || password) updateInfo()
        if (avator) updatePassword()
    }

    const handledelete = async (id) => {
        try {
            if (user._id !== id) {
                if (window.confirm("Are you sure you to delete this account !")) {
                    setLoading(true)
                    await axios.delete(`/user/delete/${id}`, {
                        headers: {Authorization: token}
                    })
                    setLoading(false)
                    setCallback(!callback)
                }
            }
        } catch (err) {
            setData({...data, err: err.response.data.msg, success: ""})
        }
    }

    return (
        <>
        <div>
            {err && showErrorMessage(err)}
            {success && showSuccessMessage(success)}
            {loading && <h3>Loading ....</h3> }
        </div>
        <div className="mx-4">
            <div className="row ">
                <div className="col-md-3 bg-light m-auto">
                    <h2 className="text-center">{isAdmin ? "Admin Profile": "User Profile"}</h2>
                    <div className="avator position-relative text-center">
                        <img style={{ width: "100px" }} src={ avator ? avator : user.avator } alt=""/>
                        <span style={{ bottom: "11px", right: "120px" }}  className="position-absolute right-4">
                             <input style={{ width: "4rem", outline: "none", borderStyle: "none" }} onChange={changeAvatar} type="file" name="file" id="file_upload"/>
                        </span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input  type="text" className="form-control" id="name" onChange={handleChange} defaultValue={user.name} name="name"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" defaultValue={user.email} disabled name="email"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" onChange={handleChange} className="form-control" value={ password } id="password" /> 
                    </div>
                   
                    <div className="mb-3">
                        <label htmlFor="cf_password" className="form-label">Confirm Password</label>
                        <input type="password" value={cf_password} onChange={handleChange} className="form-control" id="cf_password"  /> 
                    </div>
                    <div>
                        <em style={{color: "crimson"}}>
                            if you update your password here, you will not able to login in quickly using google and facebook
                        </em>
                    </div>
                    <button className="btn btn-primary  ml-5" onClick={handleUpdate} disabled={loading} >Update</button>
                   
                </div>
                <div className="col-md-9 bg-light">
                <table className="table ">
                    <thead className="table-dark">
                        <tr>
                        <th scope="col">id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Admin</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                   
                    <tbody>
                        {
                            users.map((user, index) => (
                                <tr key={user._id}>
                                    <th scope="row"> { index } </th>
                                    <td>{ user.name }</td>
                                    <td>{ user.email }</td>
                                    <td>
                                        { user.role === 1 
                                        ? "Admin" 
                                        : "user" 
                                        }
                                    </td>
                                    <td>
                                        <Link to={`/edit_user/${user._id}`}> edit </Link>/
                                        <p className="text-danger btn" onClick={() => handledelete(user._id)}> remove </p>
                                    </td>
                                </tr>
                            ))
                        }
                        
                    </tbody>
                </table>
                </div>
            </div>
        </div>
        </>
    )
}

export default Profile
