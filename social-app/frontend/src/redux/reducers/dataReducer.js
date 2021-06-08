import {
    SET_SCREAMS, LIKE_SCREAM,
    UNLIKE_SCREAM, LOADING_DATA,
    DELETE_SCREAM, ADD_SCREAM,
    SET_SCREAM, COMMENT_SCREAM,
    LOADING_COMMENT, STOP_LOADING_COMMENT
} from "../type";

const initialState = {
    screams: [],
    scream: {},
    loading: false,
    loadingCom: false
}

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SCREAMS:
            return {
                ...state,
                screams: action.payload,
                loading: false
            }
        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            let index = state.screams.findIndex((scream) => scream.screamId === action.payload.screamId)
            state.screams[index] = action.payload
            if (state.scream.screamId === action.payload.screamId) {
                state.scream = action.payload
            }
            return {
                ...state
            }
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case DELETE_SCREAM:
            let Index = state.screams.findIndex((scream) => scream.screamId === action.payload)
            state.screams.splice(Index, 1)
            return {
                ...state,
            }
        case ADD_SCREAM:
            return {
                ...state,
                screams: [
                    action.payload,
                    ...state.screams
                ],
                loading: false
            }
        case SET_SCREAM:
            return {
                ...state,
                scream: action.payload
            }
        case COMMENT_SCREAM:
            return {
                ...state,
                scream: {
                    ...state.scream,
                    comments: [action.payload ,...state.scream.comments]
                },
                loadingCom: false
            }
        case LOADING_COMMENT:
            return {
                ...state,
                loadingCom: true
            }
        case STOP_LOADING_COMMENT:
            return {
                ...state,
                loadingCom: false
            }
        default:
            return state
    }
}


export default dataReducer