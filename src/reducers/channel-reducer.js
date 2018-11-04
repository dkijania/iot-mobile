const initialState = {
    channels: "",
}

export default (state = initialState, action) => {
    switch(action.type){
        case 'CHANNELS_LOADED':
             return {...state, error: '', channels: action.channels, isLoading: false};
        case 'LOADING_CHANNELS':
            return {...state, error: '', isLoading: true};
        case 'CHANNEL_LOADED':
            return {...state, error: '', channelData: action.channelData, isLoading: false};
        case 'LOADING_CHANNELS_FAILURE':
            return {...state, error: action.payload, isLoading: false};
        default: 
            return state;
    }
}