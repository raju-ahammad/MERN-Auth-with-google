import ACTIONS from '../Actions'

const token = ""

const tokenReducers = (state=token, action) => {
    switch (action.type) {
        case ACTIONS.GET_TOKEN:
            return action.payload
        
        default:
            return state
    }
}

export default tokenReducers