import React from 'react'
import './TaskList.css';
import Task from '../task/Task';
import { MoreOutlined, PlusOutlined } from '@ant-design/icons';
import { Draggable } from 'react-beautiful-dnd';

const TaskList = ({ taskList, index }) => {

    return (
        <Draggable key={taskList.id} draggableId={`${taskList.id}`} index={index} id={taskList.id}>
            {(provided) => (
                <div className="taskList" key={taskList.id} {...provided.draggableProps}  ref={provided.innerRef}>

                    <div className='taskListTop' {...provided.dragHandleProps}>
                        <PlusOutlined style={{ position: 'absolute', top: 17, right: 50 }} />
                        <MoreOutlined style={{ position: 'absolute', top: 17, right: 20 }} />
                        <h4>{taskList.name}</h4>

                    </div>

                    <div className="taskListBody">
                        {taskList.tasks && taskList.tasks.map(task => {
                            return (
                                <Task key={task.id} task={task} />
                            )
                        })}
                    </div>
                </div>)}
        </Draggable>
    )
}

export default TaskList