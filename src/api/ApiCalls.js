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

// Workspace Member
export const getAllWorkspaceMemberByWorkspaceId = (workspaceId) => {
    return axios.get(`api/WorkspaceMembers/getallbyworkspaceidwithusers?workspaceId=${workspaceId}`);
}

// Workspace Type
export const getAllWorkspaceType = () => {
    return axios.get(`api/WorkspaceTypes/getall`);
}



// Board
export const getAllBoardsByWorkspaceId = (workspaceId) => {
    return axios.get(`api/Boards/getallbyworkspaceid?workspaceId=${workspaceId}`);
}
export const getBoardById = (boardId) => {
    return axios.get(`api/Boards/getbyid?boardId=${boardId}`);
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

// Task List
export const getAllTaskListByBoardId = (boardId) => {
    return axios.get(`api/TaskLists/getallwithtasks?boardId=${boardId}`);
}
export const updateTaskListOrder = (data) => {
    return axios.put(`api/TaskLists/updateorder`, data);
}
export const updateTaskList = (data) => {
    return axios.put(`api/TaskLists/update`, data);
}
export const addTaskList = (data) => {
    return axios.post(`api/TaskLists/add`, data);
}
export const deleteTaskList = (taskListId) => {
    return axios.delete(`api/TaskLists/delete?taskListId=${taskListId}`);
}

// Task
export const addTask = (data) => {
    return axios.post(`api/Tasks/add`, data);
}
export const deleteTask = (taskId) => {
    return axios.delete(`api/Tasks/delete?taskId=${taskId}`);
}
export const getTaskById = (id) => {
    return axios.get(`api/Tasks/getbyid?taskId=${id}`);
}

// Task Todo List
export const getAllTaskTodoListWithTodos = (taskId) => {
    return axios.get(`api/TaskTodoLists/getallwithtodo?taskId=${taskId}`);
}
export const deleteTaskTodoList = (taskTodoListId) => {
    return axios.delete(`api/TaskTodoLists/delete?id=${taskTodoListId}`);
}
export const updateTaskTodoList = (taskTodoList) => {
    return axios.put(`api/TaskTodoLists/update`, taskTodoList);
}
export const addTaskTodoList = (taskTodoList) => {
    return axios.post(`api/TaskTodoLists/add`, taskTodoList);
}

// Task Todo
export const addTaskTodo = (todo) => {
    return axios.post(`api/TaskTodos/add`, todo);
}
export const updateTaskTodo = (todo) => {
    return axios.put(`api/TaskTodos/update`, todo);
}
export const changeTaskTodoState = (todoId, state) => {
    return axios.put(`api/TaskTodos/change?id=${todoId}&state=${state}`);
}
export const deleteTaskTodo = (todoId) => {
    return axios.delete(`api/TaskTodos/delete?id=${todoId}`);
}

export const setAuthorizationHeader = ({ token, isLoggedIn }) => {
    if (isLoggedIn) {
        const authorizationValue = `Bearer ${token}`
        return axios.defaults.headers['Authorization'] = authorizationValue;
    } else {
        delete axios.defaults.headers['Authorization'];
    }
}