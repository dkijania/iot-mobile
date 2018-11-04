import axios from 'axios';
import {env} from '../configuration/Config'

export const authInputChange = ({field,value}) => {
    return {
        type: "AUTH_INPUT_CHANGE",
        changedField: {field,value} 
    }
}

export const login = ( {username, password}) => {
    
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    
    return (dispatch) => {
  
        dispatch({type: "LOGIN_ATTEMPT"});
 
        axios({
            method: 'post',
            url: env.gatewayHost + "/chariot/gateway/webapp/user/authenticate",
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(function (success) {
            dispatch({
                type: 'LOGIN_SUCCESS',
                username: username
            })
        })
        .catch(function (error) {
            dispatch({
                type: 'LOGIN_FAILURE',
                errorMessage: error.response.data.message
            })
        });
    }
}