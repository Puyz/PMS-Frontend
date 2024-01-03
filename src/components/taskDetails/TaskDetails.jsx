import React, { useEffect, useState } from 'react';
import { Avatar, Button, Col, Divider, Drawer, Flex, Popconfirm, Row, Space, Tag, Tooltip } from 'antd';
import { AlignLeftOutlined, DeleteOutlined, EditOutlined, FieldTimeOutlined, ReadOutlined, UserOutlined } from '@ant-design/icons';
import moment from 'moment';
import { deleteTask, getAllTaskTodoListWithTodos, getCommentsByTaskId, getTaskById } from '../../api/ApiCalls';
import { useDispatch } from 'react-redux';
import { refreshTaskAction, refreshTaskCommentsAction, refreshTaskTodoListAction } from '../../redux/AuthActions';
import TaskTodoList from '../../containers/taskTodoList/TaskTodoList';
import { useSelector } from 'react-redux';
import AddTaskTodoListButton from '../addTaskTodoListButton/AddTaskTodoListButton';
import TaskComment from '../taskComment/TaskComment';
import AddCommentForm from '../addCommentForm/AddCommentForm';
import UpdateTask from '../updateTask/UpdateTask';

const TaskDetails = ({ taskId, onClose, open }) => {

    const [editTask, setEditTask] = useState(false);
    const [taskData, setTaskData] = useState();
    const [taskTodoList, setTaskTodoList] = useState([]);
    const [taskComments, setTaskComments] = useState([]);
    const dispatch = useDispatch();

    const { refreshTaskTodoLists, refreshTaskComments, refreshTask } = useSelector((store) => {
        return {
            refreshTaskTodoLists: store.refreshTaskTodoLists,
            refreshTaskComments: store.refreshTaskComments,
            refreshTask: store.refreshTask
        }
    })

    async function getTodoList() {
        const responseTodoList = await getAllTaskTodoListWithTodos(taskId);
        setTaskTodoList(responseTodoList.data.data);
    }

    async function getComments() {
        const responseComments = await getCommentsByTaskId(taskId);
        setTaskComments(responseComments.data.data);
    }
    async function getData() {
        try {
            const responseTask = await getTaskById(taskId);
            setTaskData(responseTask.data.data);
        } catch (error) {

        }
    }
    useEffect(() => {
        getData();
        getTodoList();
        getComments();
    }, [taskId])

    useEffect(() => {
        if (refreshTaskTodoLists === true) {
            getTodoList();
            dispatch(refreshTaskTodoListAction(false));
        }
        if (refreshTaskComments === true) {
            getComments();
            dispatch(refreshTaskCommentsAction(false));
        }
        if (refreshTask === true) {
            getData();
            dispatch(refreshTaskAction(false));
        }
    }, [refreshTaskTodoLists, refreshTaskComments, refreshTask])

    const onDelete = async (e) => {
        await deleteTask(taskId);
        dispatch(refreshTaskAction(true));
        onClose();
    };

    return (
        <>
            {taskData &&

                <Drawer
                    width={720}
                    onClose={onClose}
                    open={open}
                    styles={{
                        body: {
                            paddingBottom: 80,
                        },
                    }}
                    extra={
                        <Space>
                            {!editTask ?
                                <>
                                    <AddTaskTodoListButton taskId={taskId} />
                                    <Button onClick={() => setEditTask(true)} icon={<EditOutlined />} />
                                    <Popconfirm
                                        title="Uyarı"
                                        description="Görevi silmek istediğinizden emin misiniz?"
                                        onConfirm={onDelete}
                                        okText="Evet"
                                        cancelText="Hayır"
                                    >
                                        <Button type="dashed" danger icon={<DeleteOutlined />} />
                                    </Popconfirm>
                                </>
                                :
                                <Button onClick={() => setEditTask(false)}>İptal et</Button>
                            }

                        </Space>
                    }
                >

                    {!editTask &&
                        <>

                            <Flex>
                                <ReadOutlined style={{ fontSize: 20, marginRight: 5 }} />
                                <h3 style={{ color: '#7b818f', margin: 0 }}>Görev adı</h3>
                            </Flex>
                            <h2>{taskData.task.name}</h2>

                            <div style={{ marginTop: 50 }}>
                                <Row>
                                    <Col md={8}>
                                        <h3 style={{ color: '#7b818f', margin: 0 }}>Bitiş tarihi</h3>
                                        <Flex>
                                            <FieldTimeOutlined style={{ fontSize: 16, marginRight: 5 }} />
                                            <h4>{moment(taskData.task.dueDate).format("DD-MM-YYYY")}</h4>
                                        </Flex>
                                    </Col>

                                    {taskData.taskLabels.length > 0 &&
                                        <Col md={8}>
                                            <h3 style={{ color: '#7b818f', margin: 0 }}>Etiketler</h3>
                                            <Space style={{ marginTop: 15 }}>
                                                {taskData.taskLabels.map((label) => {
                                                    return (
                                                        <Tag key={label.id} color={`#${label.color}`}>{label.name}</Tag>
                                                    )
                                                })}
                                            </Space>
                                        </Col>
                                    }

                                    {taskData.taskMembers.length > 0 &&
                                        <Col md={8}>
                                            <h3 style={{ color: '#7b818f', margin: 0 }}>Üyeler</h3>
                                            <Avatar.Group
                                                maxCount={2}
                                                maxPopoverTrigger="click"

                                                style={{ marginTop: 15 }}
                                                maxStyle={{
                                                    color: '#f56a00',
                                                    backgroundColor: '#fde3cf',
                                                    cursor: 'pointer'
                                                }}
                                            >

                                                {taskData.taskMembers.map(member => {
                                                    return (
                                                        <Tooltip key={member.id} title={member.name} placement="top">
                                                            <Avatar
                                                                style={{
                                                                    backgroundColor: '#87d068',
                                                                }}
                                                                icon={<UserOutlined />}
                                                            />
                                                        </Tooltip>
                                                    )
                                                })}
                                            </Avatar.Group>
                                        </Col>
                                    }
                                </Row>



                                <Flex style={{ marginTop: 20 }}>
                                    <AlignLeftOutlined style={{ fontSize: 16 }} />
                                    <h3 style={{ color: '#7b818f', marginLeft: 5 }}>Açıklama</h3>
                                </Flex>
                                <p>{taskData.task.description}</p>


                                <Divider />
                            </div>






                            {taskTodoList.length > 0 &&
                                taskTodoList.map((todoList, index) => {
                                    return (
                                        <TaskTodoList key={todoList.id} todoList={todoList} index={index} />
                                    )
                                })
                            }

                            {taskTodoList.length > 0 &&
                                <Divider />
                            }




                            {taskComments.length > 0 &&
                                taskComments.map((comment) => {
                                    return (
                                        <TaskComment key={comment.id} comment={comment} />
                                    )
                                })
                            }

                            {taskData &&
                                <AddCommentForm taskId={taskId} />
                            }
                        </>
                    }

                    {editTask && <UpdateTask taskData={taskData} setEditTask={setEditTask} />}
                </Drawer>
            }
        </>
    )
}

export default TaskDetails