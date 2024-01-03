import React, { useState } from 'react'
import './TaskList.css';
import { CheckOutlined, CloseOutlined, MoreOutlined } from '@ant-design/icons';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import AddTaskButton from '../addTaskButton/AddTaskButton';
import { Button, Dropdown, Input, Popconfirm } from 'antd';
import { deleteTaskList, updateTaskList } from '../../api/ApiCalls';
import { useDispatch } from 'react-redux';
import { refreshTaskAction } from '../../redux/AuthActions';
import TaskCard from '../taskCard/TaskCard';

const TaskList = ({ taskList, index }) => {

    const [onEdit, setOnEdit] = useState(false);
    const [taskListName, setTaskListName] = useState(taskList.name);
    const dispatch = useDispatch();

    const items = [
        {
            label: <a onClick={() => { setOnEdit(true) }}>Düzenle</a>,
            key: '0',
        },
        {
            label: <Popconfirm
                title="Uyarı"
                description="Listeyi silmek istediğinizden emin misiniz?"
                onConfirm={() => { onDeleteSubmit() }}
                okText="Evet"
                cancelText="Hayır"
            >
                <a>Sil</a>
            </Popconfirm>,
            key: '1',
        }
    ];

    const onEditSubmit = async () => {
        const data = {
            id: taskList.id,
            name: taskListName
        };

        await updateTaskList(data);
        dispatch(refreshTaskAction(true));
        setOnEdit(false);
    }

    const onDeleteSubmit = async () => {
        await deleteTaskList(taskList.id);
        dispatch(refreshTaskAction(true));
    }


    const onDragEndHandler = async (result) => {
        if (!result.destination) return;
        const items = Array.from(taskList.tasks);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        //const movedElements = findMovedElements(taskLists, items);
        //console.log(movedElements)
        //setTaskLists(items);

        /*
        for (const element of movedElements) {
            const data = {
                id: element.modified.id,
                orderNo: element.index
            }
            await updateTaskListOrder(data);
        }
        */
    }


    return (
        <>
            {taskList &&
                <Draggable key={taskList.id} draggableId={`${taskList.id}`} index={index} id={taskList.id}>
                    {(provided) => (
                        <div className="taskList" key={taskList.id} {...provided.draggableProps} ref={provided.innerRef}>

                            <div className='taskListTop' {...provided.dragHandleProps}>
                                {!onEdit ?
                                    <>
                                        <AddTaskButton taskListId={taskList.id} />
                                        <Dropdown
                                            menu={{
                                                items,
                                            }}
                                            trigger={['click']}
                                        >
                                            <MoreOutlined style={{ position: 'absolute', top: 17, right: 20 }} />
                                        </Dropdown>

                                        <h4>{taskList.name}</h4>
                                    </>

                                    :
                                    <div style={{ marginTop: 10, marginLeft: 5 }}>
                                        <Input style={{ width: 200 }} value={taskListName} onChange={(e) => { setTaskListName(e.target.value) }} />
                                        <Button onClick={() => { setOnEdit(false); setTaskListName(taskList.name) }} style={{ float: 'right', margin: '0 10px 0 5px' }} icon={<CloseOutlined />} />
                                        <Button onClick={() => { onEditSubmit() }} style={{ float: 'right' }} type="primary" icon={<CheckOutlined />} />
                                    </div>
                                }
                            </div>



                            <div style={{ height: 450 }} {...provided.droppableProps} ref={provided.innerRef}>
                                {taskList.tasks && taskList.tasks.map((task, index) => {
                                    return (
                                        <TaskCard task={task} index={index} />
                                    )
                                })}
                                {provided.placeholder}
                            </div>

                        </div>)}
                </Draggable>

            }
        </>
    )
}

export default TaskList