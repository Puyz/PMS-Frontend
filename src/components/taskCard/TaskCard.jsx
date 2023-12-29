import { Card, Popconfirm, Space, Tag } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { refreshTaskAction } from '../../redux/AuthActions';
import { DeleteOutlined } from '@ant-design/icons';
import { deleteTask } from '../../api/ApiCalls';
import TaskDetails from '../taskDetails/TaskDetails';

const TaskCard = ({ task, index }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
        console.log(task)
    };
    const onClose = () => {
        setOpen(false);
    };

    const confirm = async (e) => {
        await deleteTask(task.id);
        dispatch(refreshTaskAction(true));
    };

    return (
        <>
            <Card
                style={{
                    width: 300,
                    margin: '10px 0 10px 0'
                }}
                size='small'
                onClick={showDrawer}
            >
                <p style={{ margin: 5 }}>{task.name}</p>
                {(task.taskLabels.length > 0) &&
                    <Space size={[0, 8]} wrap>
                        {task.taskLabels.map((label) => {
                            return (
                                <Tag color={`#${label.color}`}>{label.name}</Tag>
                            )
                        })}
                    </Space>
                }

                <Popconfirm
                    title="Uyarı"
                    description="Görevi silmek istediğinizden emin misiniz?"
                    onConfirm={confirm}
                    okText="Evet"
                    cancelText="Hayır"
                >
                    <DeleteOutlined style={{ fontSize: 16, position: 'absolute', top: 20, right: 10 }} />

                </Popconfirm>
            </Card>
            <TaskDetails taskId={task.id} onClose={onClose} open={open}/>
        </>

    )
}

export default TaskCard