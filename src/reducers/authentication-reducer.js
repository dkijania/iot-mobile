const initialState = {
    username: '',
    token: '',
    password: '',
    error: '',
    isLoading: false,
    isAuthenticated: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'AUTH_INPUT_CHANGE':
            return { ...state, [action.changedField.field]: action.changedField.value, isAuthenticated: false };
        case 'LOGIN_SUCCESS':
            return { ...state, error: '', username: action.username, isLoading: false, isAuthenticated: true };
        case 'LOGIN_FAILURE':
            return { ...state, error: action.errorMessage, isLoading: false, isAuthenticated: false };
        case 'LOGIN_ATTEMPT':
            return { ...state, error: '', isLoading: true, isAuthenticated: false };
        default:
            return state;
    }
}