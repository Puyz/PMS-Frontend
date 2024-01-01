import { Button, Checkbox, Popconfirm, Popover } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { MoreOutlined } from '@ant-design/icons';
import './TaskTodo.css';
import TextArea from 'antd/lib/input/TextArea';
import { refreshTaskTodoListAction } from '../../redux/AuthActions';
import { changeTaskTodoState, deleteTaskTodo, updateTaskTodo } from '../../api/ApiCalls';

const TaskTodo = ({ todo, index }) => {

    const dispatch = useDispatch();
    const [editTodo, setEditTodo] = useState(false);
    const [todoContent, setTodoContent] = useState('');
    const [updateTodoContent, setUpdateTodoContent] = useState('');
    const [todoChecked, setTodoChecked] = useState();
    const [updateApiProgress, setUpdateApiProgress] = useState(false);

    useEffect(() => {
        setTodoContent(todo.content);
        setUpdateTodoContent(todo.content);
        setTodoChecked(todo.state);
    }, [])

    const todoOnChange = async (e) => {
        try {
            setTodoChecked(e.target.checked);
            await changeTaskTodoState(todo.id, e.target.checked);
        } catch (error) {
            setTodoChecked(todo.state);
        }
    };

    const onDeleteTodo = async () => {

        try {
            await deleteTaskTodo(todo.id);
            dispatch(refreshTaskTodoListAction(true));
            return null;

        } catch (error) {
            console.log(error)
        }
    }

    const onUpdateTodo = async () => {
        setUpdateApiProgress(true);

        const updateTodo = {
            id: todo.id,
            content: updateTodoContent
        }
        try {
            setTodoContent(todoContent);
            await updateTaskTodo(updateTodo);
            setTodoContent(updateTodoContent);
            dispatch(refreshTaskTodoListAction(true));

        } catch (error) {
            setTodoContent(todo.content)
            console.log(error)
        }
        setEditTodo(false);
        setUpdateApiProgress(false);
    }
    const onCancel = () => {
       setEditTodo(false);
       setUpdateTodoContent(todoContent);
    }

    const MoreActions = (id) => (
        <div>
            <p onClick={() => setEditTodo(true)} className='moreActions'>Düzenle</p>

            <Popconfirm
                title="Silmek istediğinizden emin misiniz?"
                okText="Evet"
                cancelText="Hayır"
                className='moreActions'
                onConfirm={onDeleteTodo}
            >
                Sil
            </Popconfirm>

        </div>
    );


    return (
        <li key={index} className='taskTodo'>


            {editTodo ?
                <>
                    <TextArea value={updateTodoContent} onChange={(e) => setUpdateTodoContent(e.target.value)} />
                    <Button onClick={onUpdateTodo} className='editTodoButton' type='primary' loading={updateApiProgress}>Kaydet</Button>
                    <Button onClick={onCancel}>İptal et</Button>
                </>

                :

                <>
                    <Checkbox
                        checked={todoChecked}
                        onChange={todoOnChange}
                        style={{ marginRight: 10 }}
                    />
                    <span>
                        {todoContent}
                    </span>

                    <div className='moreButton' >
                        <Popover content={() => MoreActions(todo.id)} placement="bottom" trigger="click" arrow={false}>
                            <MoreOutlined />
                        </Popover>
                    </div>
                </>
            }



        </li>
    );
};

export default TaskTodo;