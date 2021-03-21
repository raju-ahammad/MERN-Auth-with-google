import { ThemeProvider } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import './app.css'
import Body from './Components/body/Body'
import Header from './Components/header/Header'
import { dispatchGetUser, disPatchLogin, fetchUser } from './Components/redux/Actions/authActions'
import theme from "./Components/theme/theme"


const App = () => {

  const dispatch = useDispatch()
  const token = useSelector(state => state.token)
  const auth = useSelector(state => state.auth)
  
  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin');
    if (firstLogin) {
      const getToken = async () => {
        const res = await axios.post('/user/refresh_token', null)
        dispatch({type: 'GET_TOKEN', payload: res.data.access_token})
        console.log(res);
      }
      getToken()
    }
   
  }, [auth.isLogged, dispatch])


  useEffect( () => {
    if (token) {
      const getUser = () => {

        dispatch(disPatchLogin())

        return fetchUser(token).then(res => {
          dispatch(dispatchGetUser(res))
        })
      }
      getUser()
    }
  }, [token, dispatch])

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header/>
        <Body/>
        
      </Router>
    </ThemeProvider>
   
  )
}

export default App
