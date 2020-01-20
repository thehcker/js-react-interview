import { FETCH_USERS, TOGGLE_EDIT_MODE, SET_CURRENT_USER, HANDLE_ERROR, EDIT_USER } from "./types";

export const toggleEditMode = () => dispatch => {
    dispatch({
        type: TOGGLE_EDIT_MODE
    })
}

export const setCurrentUser = user => dispatch => {
    dispatch({
        type: SET_CURRENT_USER,
        payload: user
    })
}

export const editUser = userData => dispatch => {
    console.log("HHiii")
    fetch('https://ti-react-test.herokuapp.com/users/', {
        method: "PATCH",
        body: JSON.stringify(userData)
    })
    .then(response => {
        if(response.ok){
            console.log(response)
            return response.json()
        }
        throw new Error("Error updating user")
        
    })
    .then(data => {
        console.log(data)
        dispatch({
            type: EDIT_USER,
            payload: true 
        })
    })
    .catch(error => {
        console.log(error)
        dispatch({
            type: HANDLE_ERROR,
            payload: error.message
        })
    })
   
}
export const getUsers = () => dispatch => {
    fetch('https://ti-react-test.herokuapp.com/users')
    .then(response => {
        if(response.ok){
            return response.json()
        }
        throw new Error("Fetch Error Occured");
    })
    .then(data => {
        dispatch({
            type: FETCH_USERS,
            payload: data
        })
    })
    .catch(error => {
        dispatch({
            type: HANDLE_ERROR,
            payload: error.message
        })
    })
}
