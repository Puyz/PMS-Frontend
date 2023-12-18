import axios from "axios";


// Auth
export const loginRequest = (credentials) => {
    return axios.post('api/auth/login', credentials);
}

// Workspace
export const getAllWorkspace = (userId) => {
    return axios.get(`api/Workspaces/getallbyuserid?userId=${userId}`);
}
export const getWorkspaceById = (workspaceId) => {
    return axios.get(`api/Workspaces/getbyid?workspaceId=${workspaceId}`);
}
export const addWorkspace = (data) => {
    return axios.post(`api/Workspaces/add`, data);
}
export const updateWorkspace = (data) => {
    return axios.put(`api/Workspaces/update`, data);
}
export const deleteWorkspace = (workspaceId) => {
    return axios.delete(`api/Workspaces/delete?workspaceId=${workspaceId}`);
}

// Workspace Type
export const getAllWorkspaceType = () => {
    return axios.get(`api/WorkspaceTypes/getall`);
}



// Board
export const getAllBoardsByWorkspaceId = (workspaceId) => {
    return axios.get(`api/Boards/getallbyworkspaceid?workspaceId=${workspaceId}`);
}
export const addBoard = (data) => {
    return axios.post(`api/Boards/add`, data);
}
export const updateBoard = (data) => {
    return axios.put(`api/Boards/update`, data);
}
export const deleteBoard = (boardId) => {
    return axios.delete(`api/Boards/delete?boardId=${boardId}`);
}



export const setAuthorizationHeader = ({ token, isLoggedIn }) => {
    if (isLoggedIn) {
        const authorizationValue = `Bearer ${token}`
        return axios.defaults.headers['Authorization'] = authorizationValue;
    } else {
        delete axios.defaults.headers['Authorization'];
    }
}