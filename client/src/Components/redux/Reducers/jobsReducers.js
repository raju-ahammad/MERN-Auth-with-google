import ACTIONS from '../Actions';

const initialState = {
    jobs: [],
    isLoading: false
}

//const jobs = []

const jobsReducer = (state = initialState, action)=> {
    switch (action.type) {
        case ACTIONS.GET_ALL_JOBS:
            return {
                ...state,
                jobs: action.payload,
                isLoading: true
            }
        
        default:
            return state;
    }
}

export default jobsReducer
