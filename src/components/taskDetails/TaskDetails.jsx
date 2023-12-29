import React, { useEffect, useState } from 'react';
import { Avatar, Button, Col, Divider, Drawer, Flex, Row, Select, Space, Tag, Tooltip } from 'antd';
import { AlignLeftOutlined, FieldTimeOutlined, ReadOutlined, UserOutlined } from '@ant-design/icons';
import moment from 'moment';
import { getTaskById } from '../../api/ApiCalls';

const TaskDetails = ({ taskId, onClose, open }) => {

    const [taskData, setTaskData] = useState();

    useEffect(() => {
        async function getTask() {
            const response = await getTaskById(taskId);
            setTaskData(response.data.data);
        }
        getTask();
    }, [taskId])

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
                            <Button onClick={onClose}>Cancel</Button>
                            <Button onClick={onClose} type="primary">
                                Submit
                            </Button>
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
                                                <Tag color={`#${label.color}`}>{label.name}</Tag>
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
                                        size="large"
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



                        <Flex style={{ marginTop: 50 }}>
                            <AlignLeftOutlined style={{ fontSize: 16 }} />
                            <h3 style={{ color: '#7b818f', marginLeft: 5 }}>Açıklama</h3>
                        </Flex>
                        <p>{taskData.task.description}</p>


                        <Divider />
                    </div>
                </Drawer>
            }
        </>
    )
}

export default TaskDetails