import { loginRequest, logoutRequest, signupRequest, updateUser } from '../api/ApiCalls';
import * as ACTIONS from './Constants';

export const logoutSuccessAction = () => {
    return {
        type: ACTIONS.LOGOUT_SUCCESS
    };
}

export const loginSuccessAction = (authState) => {
    return {
        type: ACTIONS.LOGIN_SUCCESS,
        payload: authState
    };
}

export const refreshWorkspaceAction = (payload) => {
    return {
        type: ACTIONS.REFRESH_WORKSPACE,
        payload: payload
    };
}
export const refreshBoardAction = (payload) => {
    return {
        type: ACTIONS.REFRESH_BOARD,
        payload: payload
    };
}
export const refreshTaskAction = (payload) => {
    return {
        type: ACTIONS.REFRESH_TASK,
        payload: payload
    };
}

export const refreshTaskTodoListAction = (payload) => {
    return {
        type: ACTIONS.REFRESH_TASK_TODO_LIST,
        payload: payload
    };
}
export const refreshTaskCommentsAction = (payload) => {
    return {
        type: ACTIONS.REFRESH_TASK_COMMENTS,
        payload: payload
    };
}

export const updateSuccessAction = ({displayName, image}) => {
    return {
        type: ACTIONS.UPDATE_SUCCESS,
        payload: {
            displayName,
            image
        }
    }
}
/*
export const updateHandler = (username, credentials) => {
    return async function (dispatch) {
        const response = await updateUser(username, credentials);
        const newState = {
            ...response.data,
        }

        dispatch(updateSuccessAction(newState));
        return response;
    };
}
*/

export const loginHandler = credentials => {
    return async function (dispatch) {
        const response = await loginRequest(credentials);
        const authState = {
            ...response.data
        }

        dispatch(loginSuccessAction(authState));
        return response;
    };
}


export const logoutHandler = () => {
    return async function (dispatch) {
        dispatch(logoutSuccessAction());
    };
}
/*
export const signupHandler = user => {
    return async function (dispatch) {
        const response = await signupRequest(user);
        await dispatch(loginHandler(user))
        return response;
    };
}
*/