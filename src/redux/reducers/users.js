import { FETCH_USERS, EDIT_USER, SET_CURRENT_USER, HANDLE_ERROR, TOGGLE_EDIT_MODE, RESET_USER_EDIT } from '../actions/types';

const initialState = {
    userList: [],
    currentUser: {},
    userEdited: false,
    errorOccured: {
        status: false,
        message: ""
    },
    editMode: false
}
export default function(state = initialState, action){
    switch (action.type) {
        case FETCH_USERS:
            return {
                ...state,
                userList: action.payload
            };
        case EDIT_USER:
            return {
                ...state,
                userEdited: true
            };
        case RESET_USER_EDIT:
            return {
                ...state,
                userEdited: false
            }
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            };
        case HANDLE_ERROR:
            return {
                ...state,
                errorOccured: {status: true, message: action.payload}
            }
        case TOGGLE_EDIT_MODE:
            return {
                ...state,
                editMode: !state.editMode
            }
        default:
            return state;

    }
}