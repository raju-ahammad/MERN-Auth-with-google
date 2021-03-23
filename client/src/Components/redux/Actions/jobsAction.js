import axios from 'axios'
import ACTIONS from './index'


export const fetchAllJobs = async () => {
  const res = await axios.get('/api/')
  return res
}


export const dispatchGetJobs = (res) => {
    return {
        type: ACTIONS.GET_ALL_JOBS,
        payload: res.data
    }
  }