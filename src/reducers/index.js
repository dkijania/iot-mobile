import { combineReducers } from 'redux';
import AuthenticationReducer from './authentication-reducer';
import ChannelReducer from './channel-reducer';

export default combineReducers({
    auth: AuthenticationReducer,
    channel: ChannelReducer
})