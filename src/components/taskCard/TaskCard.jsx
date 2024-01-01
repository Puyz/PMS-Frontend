import { Avatar, Card, Space, Tag, Tooltip } from 'antd'
import React, { useState } from 'react'
import TaskDetails from '../taskDetails/TaskDetails';
import { UserOutlined } from '@ant-design/icons';

const TaskCard = ({ task, index }) => {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
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
                <div >
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
                </div>

                {(task.taskMembers.length > 0) &&
                    <Avatar.Group
                        maxCount={2}
                        size="small"
                        style={{ position: 'absolute', top: 20, right: 20 }}
                        maxStyle={{
                            color: '#f56a00',
                            backgroundColor: '#fde3cf',
                            cursor: 'pointer'
                        }}
                    >

                        {task.taskMembers.map(member => {
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
                }
            </Card>
            {open &&
                <TaskDetails taskId={task.id} onClose={onClose} open={open} />
            }
        </>

    )
}

export default TaskCard