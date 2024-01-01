import * as ACTIONS from "./Constants.js";

const defaultState = {
    isLoggedIn: false,
    id: undefined,
    email: undefined,
    name: undefined,
    image: undefined,
    token: undefined,
    expiration: undefined,
    refreshWorkspace: false,
    refreshBoard: false,
    refreshTask: false,
    refreshTaskTodoLists: false
}

const authReducer = (state = { ...defaultState }, action) => {

    if (action.type === ACTIONS.LOGOUT_SUCCESS) {
        return defaultState;
    }
    else if (action.type === ACTIONS.LOGIN_SUCCESS) {
        return {
            ...action.payload,
            isLoggedIn: true
        };
    }
    else if (action.type === ACTIONS.UPDATE_SUCCESS) {
        return {
            ...state,
            ...action.payload
        };
    }
    else if (action.type === ACTIONS.REFRESH_WORKSPACE) {
        return {
            ...state,
            refreshWorkspace: action.payload
        };
    }
    else if (action.type === ACTIONS.REFRESH_BOARD) {
        return {
            ...state,
            refreshBoard: action.payload
        };
    }
    else if (action.type === ACTIONS.REFRESH_TASK) {
        return {
            ...state,
            refreshTask: action.payload
        };
    }
    else if (action.type === ACTIONS.REFRESH_TASK_TODO_LIST) {
        return {
            ...state,
            refreshTaskTodoLists: action.payload
        };
    }
    return state;
}

export default authReducer;