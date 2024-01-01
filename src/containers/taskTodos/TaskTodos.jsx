import React, { useState } from 'react';
import './TaskTodos.css';
import { Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useDispatch } from 'react-redux';
import TaskTodo from '../../components/taskTodo/TaskTodo';
import { addTaskTodo } from '../../api/ApiCalls';
import { refreshTaskTodoListAction } from '../../redux/AuthActions';
const TaskTodos = ({ todos, todoListId }) => {

    const dispatch = useDispatch();
    const [showAddTaskTodoEditor, setShowAddTaskTodoEditor] = useState(false);
    const [addApiProgress, setAddApiProgress] = useState(false);
    const [editorValue, setEditorValue] = useState();



    const onAddTodo = async () => {
        setAddApiProgress(true);
        try {
            const todo = {
                taskTodoListId: todoListId,
                content: editorValue
            }
            await addTaskTodo(todo);
            setEditorValue(undefined);
            setShowAddTaskTodoEditor(false);
            dispatch(refreshTaskTodoListAction(true));

        } catch (error) {
            console.log(error)
        }
        setAddApiProgress(false);
    }

    return (
        <>
            {todos.length > 0 &&
                todos.map((todo, index) => (
                    <TaskTodo todo={todo} index={index} />
                ))
            }

            <div style={{ marginTop: 10 }}>
                {
                    showAddTaskTodoEditor ?
                        <>
                            <TextArea onChange={(e) => setEditorValue(e.target.value)} value={editorValue} />
                            <Button type='primary' className='addTaskTodoButton' onClick={onAddTodo} loading={addApiProgress}>Ekle</Button>
                            <Button onClick={() => setShowAddTaskTodoEditor(false)}>İptal </Button>
                        </>
                        :
                        <Button onClick={() => setShowAddTaskTodoEditor(true)}>Bir öğe ekleyin</Button>
                }
            </div>
        </>
    );
};

export default TaskTodos;