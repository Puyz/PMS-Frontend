import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TaskList from '../../components/taskList/TaskList';
import { getAllTaskListByBoardId, updateTaskListOrder } from '../../api/ApiCalls';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const Board = () => {
    const { boardId } = useParams();

    const [taskLists, setTaskLists] = useState([]);

    useEffect(() => {
        async function getAllTaskLists() {
            try {
                const response = await getAllTaskListByBoardId(boardId);
                setTaskLists(response.data.data);
            } catch (error) {

            }
        }
        getAllTaskLists();
    }, []);

    const onDragEndHandler = async (result) => {
        if (!result.destination) return;
        const items = Array.from(taskLists);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        const movedElements = findMovedElements(taskLists, items);
        console.log(movedElements)
        setTaskLists(items);

        for (const element of movedElements) {
            const data = {
                id: element.modified.id,
                orderNo: element.index
            }
            await updateTaskListOrder(data);
        }

    }


    function findMovedElements(originalArray, modifiedArray) {
        const movedElements = [];
    
        if (originalArray.length !== modifiedArray.length) {
            return movedElements;
        }
    
        for (let i = 0; i < originalArray.length; i++) {
            if (originalArray[i] !== modifiedArray[i]) {
                movedElements.push({
                    original: originalArray[i],
                    modified: modifiedArray[i],
                    index: i
                });
            }
        }
    
        if (movedElements.length === 1) {
            return [movedElements[0]];
        }
    
        return movedElements;
    }
    



    return (
        <DragDropContext onDragEnd={onDragEndHandler}>
            <Droppable droppableId='taskList' direction="horizontal">
                {provided => (
                    <div style={{ marginLeft: 150, display: 'flex' }} {...provided.droppableProps} ref={provided.innerRef}>
                        {taskLists && taskLists.map((taskList, index) => {
                            return (
                                <TaskList key={taskList.id} taskList={taskList} index={index} />
                            )
                        })}
                        {provided.placeholder}
                    </div>
                )}

            </Droppable>
        </DragDropContext>
    )
}

export default Board