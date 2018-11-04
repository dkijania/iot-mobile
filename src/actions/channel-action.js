import axios from 'axios';
import {env} from '../configuration/Config'

export const getChannels = (username) => {

    return (dispatch) => {

        dispatch({ type: "LOADING_CHANNELS" });
        console.log(env.gatewayHost + '/chariot/gateway/webapp/channel/list?userName=' + username);
               
        axios({
            method: 'get',
            url: env.gatewayHost + '/chariot/gateway/webapp/channel/list?userName=' + username,
            config: { headers: { 'Accept': 'application/json;charset=UTF-8' } }
        })
            .then(function (response) {
                console.log(response);
                dispatch({
                    type: 'CHANNELS_LOADED',
                    channels: response.data
                })
            }).catch(function (error) {
                console.log(response);
                dispatch({
                    type: 'LOADING_CHANNELS_FAILURE',
                    payload: error.response.data.message
                })
            });
    }
}

export const getChannelData = (channelId) => {

    return (dispatch) => {

        dispatch({ type: "LOADING_CHANNELS" });

        axios({
            method: 'get',
            url: env.gatewayHost + '/chariot/gateway/webapp/measurement/get?channelId=' + channelId,
            config: { headers: { 'Accept': 'application/json;charset=UTF-8' } }
        })
            .then(function (response) {
                dispatch({
                    type: 'CHANNEL_LOADED',
                    channelData: response.data,
                })
            }).catch(function (error) {
                dispatch({
                    type: 'LOADING_CHANNELS_FAILURE',
                    payload: error.response.data.message
                })
            });
    }
}