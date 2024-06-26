import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';

// export const registerUser = (user, history) => (dispatch) => {
//     axios.post('/api/auth/register', user)
//         .then(res => history.push('/login'))
//         .catch(err => {
//             dispatch({
//                 type: GET_ERRORS,
//                 payload: err.response.data
//             });
//         });
// }

export const loginUser = (user, history) => (dispatch) => {
    axios.post('/api/auth/login', user)
        .then(res => {
            const { token } = res.data;
            const decoded = jwt_decode(token);
            
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            console.log(decoded);
            dispatch(setCurrentUser(decoded)) 
            console.log('Logged in!')
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
            return;
        });
}

export const logoutUser = (history) => (dispatch) => { 
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    history.push('/login');
}

export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}