import { Button, Input, Popconfirm, Spin, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './TaskTodoList.css';
import { CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import TaskTodos from '../taskTodos/TaskTodos';
import { deleteTaskTodoList, updateTaskTodoList } from '../../api/ApiCalls';
import { refreshTaskTodoListAction } from '../../redux/AuthActions';

const TaskTodoList = ({ todoList, index }) => {

    const dispatch = useDispatch();
    const [deleteTodoListApiProgress, setDeleteTodoListApiProgress] = useState(false);
    const [editTodoList, setEditTodoList] = useState(false);
    const [todoListTitle, setTodoListTitle] = useState();
    const [updateTodoListTitle, setUpdateTodoListTitle] = useState();
    const [updateApiProgress, setUpdateApiProgress] = useState(false);


    useEffect(() => {
        setTodoListTitle(todoList.title);
        setUpdateTodoListTitle(todoList.title);
    }, []);

    const onDeleteTaskTodoList = async (todoListId) => {
        setDeleteTodoListApiProgress(true)
        try {
            await deleteTaskTodoList(todoListId);
            dispatch(refreshTaskTodoListAction(true));
        } catch (error) {
            console.log(error)
        }
        setDeleteTodoListApiProgress(false);
    }

    const onChange = async (e) => {
        setUpdateTodoListTitle(e.target.value);
    }

    const onCancel = () => {
        setEditTodoList(false);
        setUpdateTodoListTitle(todoListTitle);
    }

    const updateTodoList = async () => {
        setUpdateApiProgress(true);
        try {
            const updated = {
                id: todoList.id,
                title: updateTodoListTitle
            }
            await updateTaskTodoList(updated);
            setTodoListTitle(updateTodoListTitle);
            dispatch(refreshTaskTodoListAction(true));
        } catch (error) {
            message.error("Güncellenirken hata meydana geldi");
        }
        setUpdateApiProgress(false);
        setEditTodoList(false);
    }
    return (
        <>
            <ul key={index} style={{ marginBottom: 30, listStyleType: 'none', padding: 0 }}>
                {!editTodoList ?
                    <div className='todoList'>
                        <div className='btnContainer'>
                            <h4 style={{color: 'gray'}}>{todoList.title}</h4>
                            <div className='todoListBtns'>

                            <Button className='editBtn' icon={<EditOutlined />} onClick={() => setEditTodoList(true)} />
                            {deleteTodoListApiProgress ? <Spin /> :
                                <Popconfirm
                                placement='topRight'
                                title="Listeyi silmek istediğinizden emin misiniz?"
                                okText="Evet"
                                cancelText="Hayır"
                                onConfirm={() => onDeleteTaskTodoList(todoList.id)}
                                >
                                    <Button className='deleteBtn' icon={<DeleteOutlined />} />
                                </Popconfirm>
                            }
                            </div>
                        </div>
                    </div>

                    :

                    <div className='todoList'>
                        <Input className='editor' onChange={onChange} value={updateTodoListTitle} />
                        <div className='btnContainer'>
                            <Button className='editBtn' icon={<CheckOutlined />} onClick={updateTodoList} loading={updateApiProgress} />
                            <Button icon={<CloseOutlined />} onClick={onCancel} />
                        </div>
                    </div>
                }


                <TaskTodos todos={todoList.taskTodos} todoListId={todoList.id} />


            </ul>

        </>

    );

}
export default TaskTodoList