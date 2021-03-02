import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { showErrorMessage, showSuccessMessage } from '../notification/Notification'

const EditUser = () => {
    const [editUser, setEditUser] = useState([])
    const [checkAdmin, setCheckAdmin] = useState(false)
    const [err, setErr] = useState(false)
    const [success, setSuccess] = useState(false)
    const [num, setNum] = useState(0)

    const {id} = useParams()
    const history = useHistory()
    console.log(id, history);

    const token = useSelector(state => state.token)
    const users = useSelector(state => state.users)

    useEffect(() => {
        if (users.length !== 0) {
            users.forEach(user => {
                if (user._id === id) {
                    setEditUser(user)
                    setCheckAdmin(user.role === 1 ? true : false)
                }
            });
        }else {
            history.push('/profile')
        }   
    }, [id, history, users])

    // const handleChange = (e) => {
    //     const {name, value } = e.target

    //     setEditUser({...data, [name]:value, err: "", success:""})
    // }

    const handleUpdate = async () => {

        if (num % 2 !==0){
            const res = await axios.patch(`/user/update_role/${ editUser._id }`, {
                role: checkAdmin ? 1 : 0
            }, {
                headers: {Authorization: token}
            })
            setSuccess(res.data.msg)
            setNum(0)
        }

    }

    const handleCheck = () => {
        setSuccess("")
        setErr("")
        setCheckAdmin(!checkAdmin)
        setNum(num+1)
    }



    return (
        <div className="container m-5">
            <button className="btn btn-info" onClick={ () => history.goBack()} >Go back</button>
            <h2 className="text-center">Edit User</h2>
           
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input  type="text" className="form-control" disabled id="name" defaultValue={editUser.name}  name="name"/>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" disabled className="form-control" id="email" defaultValue={editUser.email}  name="email"/>
            </div>
            <div className="form-group">
                <input type="checkbox" className="mr-3" id="isAdmin" checked={checkAdmin} onChange={handleCheck} />
                <label htmlFor="">isAdmin</label>
            </div>
         
         
            <button onClick={handleUpdate} className="btn btn-primary  ml-5"  >Update</button>
            { err && showErrorMessage(err) }
            { success && showSuccessMessage(success) }
            
        </div>
    )
}

export default EditUser
