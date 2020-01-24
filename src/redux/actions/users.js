import { FETCH_USERS, TOGGLE_EDIT_MODE, SET_CURRENT_USER, HANDLE_ERROR, EDIT_USER, RESET_USER_EDIT } from "./types";

export const toggleEditMode = () => dispatch => {
    dispatch({
        type: TOGGLE_EDIT_MODE
    });
}

export const setCurrentUser = user => dispatch => {
    dispatch({
        type: SET_CURRENT_USER,
        payload: user
    });
}

export const resetUserEdited = () => dispatch => {
    dispatch({ type: RESET_USER_EDIT });
}

export const editUser = (userData, userId) => dispatch => {
    const url = `https://ti-react-test.herokuapp.com/users/${userId}`;
    fetch(url, {
        method: "PATCH",
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: userData
    })
    .then(response => {
        if(response.ok){
            let message =  document.getElementById('message');
            message.textContent = 'User updated successfully!';
            message.style.display = 'block';
            setTimeout(() => {
                message.style.display = 'none';
            }, 1500)
            
            return response.json();
        }
        throw new Error("Error updating user");
        
    })
    .then(data => {
        dispatch({ type: EDIT_USER })
    })
    .catch(error => {
        dispatch({
            type: HANDLE_ERROR,
            payload: error.message
        })
    });
   
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
        });
    })
    .catch(error => {
        dispatch({
            type: HANDLE_ERROR,
            payload: error.message
        });
    });
}
