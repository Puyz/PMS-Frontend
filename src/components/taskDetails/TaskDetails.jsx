import React, { useEffect, useState } from 'react';
import { Avatar, Button, Col, Divider, Drawer, Flex, Popconfirm, Row, Space, Tag, Tooltip } from 'antd';
import { AlignLeftOutlined, DeleteOutlined, FieldTimeOutlined, PlusOutlined, ReadOutlined, UserOutlined } from '@ant-design/icons';
import moment from 'moment';
import { deleteTask, getAllTaskTodoListWithTodos, getTaskById } from '../../api/ApiCalls';
import { useDispatch } from 'react-redux';
import { refreshTaskAction, refreshTaskTodoListAction } from '../../redux/AuthActions';
import TaskTodoList from '../../containers/taskTodoList/TaskTodoList';
import { useSelector } from 'react-redux';
import AddTaskTodoListButton from '../addTaskTodoListButton/AddTaskTodoListButton';

const TaskDetails = ({ taskId, onClose, open }) => {

    const [taskData, setTaskData] = useState();
    const [taskTodoList, setTaskTodoList] = useState([]);
    const dispatch = useDispatch();

    const { refreshTaskTodoLists } = useSelector((store) => {
        return {
            refreshTaskTodoLists: store.refreshTaskTodoLists
        }

    })

    useEffect(() => {
        async function getData() {
            const responseTask = await getTaskById(taskId);
            setTaskData(responseTask.data.data);
        }
        async function getTodoList() {
            const responseTodoList = await getAllTaskTodoListWithTodos(taskId);
            setTaskTodoList(responseTodoList.data.data);
        }
        if (refreshTaskTodoLists === true) {
            getTodoList();
            dispatch(refreshTaskTodoListAction(false));
        }
        getData();
        getTodoList();
    }, [taskId, refreshTaskTodoLists])

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
                            <AddTaskTodoListButton taskId={taskId}/>
                            <Popconfirm
                                title="Uyarı"
                                description="Görevi silmek istediğinizden emin misiniz?"
                                onConfirm={onDelete}
                                okText="Evet"
                                cancelText="Hayır"
                            >
                                <Button type="dashed" danger icon={<DeleteOutlined />} />
                            </Popconfirm>
                        </Space>
                    }
                >
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

                </Drawer>
            }
        </>
    )
}

export default TaskDetails