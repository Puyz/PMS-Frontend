import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TaskList from '../../components/taskList/TaskList';
import { getAllTaskListByBoardId, getBoardById, updateTaskListOrder } from '../../api/ApiCalls';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { refreshTaskAction } from '../../redux/AuthActions';
import AddTaskListButton from '../../components/addTaskListButton/AddTaskListButton';
import { Avatar, Col, Divider, Flex, Row, Tooltip } from 'antd';
import { ClockCircleOutlined, UserOutlined } from '@ant-design/icons';
import moment from 'moment';

const Board = () => {
    const { boardId } = useParams();
    const [taskLists, setTaskLists] = useState([]);
    const [board, setBoard] = useState();
    const dispatch = useDispatch();
    const { refreshTask } = useSelector((store) => {
        return {
            refreshTask: store.refreshTask
        }
    });

    useEffect(() => {
        async function getAllTaskLists() {
            try {
                const response = await getAllTaskListByBoardId(boardId);
                setTaskLists(response.data.data);
            } catch (error) { }
        }
        async function getBoard() {
            try {
                const response = await getBoardById(boardId);
                setBoard(response.data.data);
            } catch (error) { }
        }
        if (refreshTask === true) {
            getAllTaskLists();
            dispatch(refreshTaskAction(false));
        }
        getAllTaskLists();
        getBoard();
    }, [boardId, refreshTask]);

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
        <>
            {board &&
                <div>
                    <Row>
                        <Col span={8}>
                            <div>
                                <h2 style={{ marginTop: 30, textAlign: 'left', marginLeft: 150 }}>{board.name}</h2>
                                <p style={{ color: 'gray', textAlign: 'left', marginLeft: 150 }}><ClockCircleOutlined /> {moment(board.endDate).format('DD-MM-YYYY')}</p>
                            </div>
                        </Col>

                        <Col span={8} style={{ marginTop: '40px' }}>

                        </Col>

                        <Col span={8} style={{ marginTop: '40px', right: 0 }}>
                            <Avatar.Group
                                maxCount={2}
                                maxPopoverTrigger="click"
                                size="large"
                                maxStyle={{
                                    color: '#f56a00',
                                    backgroundColor: '#fde3cf',
                                    cursor: 'pointer',
                                }}
                            >
                                <Tooltip title={board.createdUser.name} placement="top">
                                    <Avatar
                                        style={{
                                            backgroundColor: '#87d068',
                                        }}
                                        icon={<UserOutlined />}
                                    />
                                </Tooltip>
                                {board.boardMembers && board.boardMembers.map(member => {
                                    return (
                                        <Tooltip title={member.name} placement="top">
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
                    </Row>
                </div>
            }
            <div style={{ marginLeft: 150, marginRight: 150 }}>
                <Divider />
            </div>



            <DragDropContext onDragEnd={onDragEndHandler}>
                <Droppable droppableId='taskList' direction="horizontal">
                    {provided => (
                        <Flex style={{ marginLeft: 130, overflow: 'scroll', height: 600, marginRight: 130 }} {...provided.droppableProps} ref={provided.innerRef}>
                            {taskLists && taskLists.map((taskList, index) => {
                                return (
                                    <TaskList key={taskList.id} taskList={taskList} index={index} />
                                )
                            })}
                            {provided.placeholder}
                            <AddTaskListButton boardId={boardId} />
                        </Flex>
                    )}

                </Droppable>
            </DragDropContext>
        </>
    )
}

export default Board