import React, { useEffect, useState } from 'react'
import { Avatar, Button, Col, DatePicker, Divider, Flex, Form, Input, Row, Space, Tooltip } from 'antd';
import { AlignLeftOutlined, FieldTimeOutlined, ReadOutlined, UserOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import DebounceSelect from '../debounceSelect/DebounceSelect';
import { getAllLabels, getUserByName, updateTask } from '../../api/ApiCalls';
import { useDispatch } from 'react-redux';
import { refreshTaskAction } from '../../redux/AuthActions';

const UpdateTask = ({ taskData, setEditTask }) => {

    const dispatch = useDispatch();
    const [apiProgress, setApiProgress] = useState(false);
    const [initialTaskMembers, setInitialTaskMembers] = useState([]);
    const [initialTaskLabels, setInitialTaskLabels] = useState([]);
    const [taskLabels, setTaskLabels] = useState();

    const [addUserIds, setAddUserIds] = useState([]);
    const [removeUserIds, setRemoveUserIds] = useState([]);

    const [addLabelIds, setAddLabelIds] = useState([]);
    const [removeLabelIds, setRemoveLabelIds] = useState([]);


    const onMemberDeselect = (member) => {
        if (addUserIds.includes(member.value)) {
            setAddUserIds(prevAddUserIds => prevAddUserIds.filter(userId => userId !== member.value));
        }
        if (!removeUserIds.includes(member.value)) {
            setRemoveUserIds(prevRemoveUserIds => [...prevRemoveUserIds, member.value]);

        }
        setInitialTaskMembers(prevInitialTaskMembers =>
            prevInitialTaskMembers.filter(user => user.value !== member.value)
        );
    };

    const onMemberSelect = (member) => {
        if (!addUserIds.includes(member.value) && !initialTaskMembers.some(user => user.value === member.value)) {
            setAddUserIds(prevAddUserIds => [...prevAddUserIds, member.value]);

        }
        if (removeUserIds.includes(member.value)) {
            setRemoveUserIds(prevRemoveUserIds =>
                prevRemoveUserIds.filter(userId => userId !== member.value)
            );

        }
    };

    const onLabelDeselect = (label) => {
        if (addLabelIds.includes(label.value)) {
            setAddLabelIds(prevAddLabelIds => prevAddLabelIds.filter(labelId => labelId !== label.value));
        }
        if (!removeLabelIds.includes(label.value)) {
            setRemoveLabelIds(prevRemoveLabelIds => [...prevRemoveLabelIds, label.value]);

        }
        setInitialTaskLabels(prevInitialTaskLabels =>
            prevInitialTaskLabels.filter(currentLabel => currentLabel.value !== label.value)
        );
    };

    const onLabelSelect = (label) => {
        if (!addLabelIds.includes(label.value) && !initialTaskLabels.some(currentLabel => currentLabel.value === label.value)) {
            setAddLabelIds(prevAddLabelIds => [...prevAddLabelIds, label.value]);

        }
        if (removeLabelIds.includes(label.value)) {
            setRemoveLabelIds(prevRemoveLabelIds =>
                prevRemoveLabelIds.filter(labelId => labelId !== label.value)
            );

        }
    };


    async function getLabels() {
        try {
            const response = (await getAllLabels()).data;

            if (response.data) {
                const labels = response.data.map((label) => ({
                    label: label.name,
                    value: label.id
                }))
                setTaskLabels(labels);
            }

        } catch (error) { }
    }

    async function SearchUserList(username) {
        if (username === '') return
        return getUserByName(username).then((response) =>
            response.data.data.map((user) => ({
                label: `${user.name}`,
                value: user.id,
            })),
        );
    }


    useEffect(() => {

        getLabels();

        if (taskData.taskMembers) {
            const members = taskData.taskMembers.map((user) => ({
                label: user.name,
                value: user.userId,
            }))
            setInitialTaskMembers(members)
        }
        if (taskData.taskLabels) {
            const labels = taskData.taskLabels.map((label) => ({
                label: label.name,
                value: label.labelId,
            }));
            setInitialTaskLabels(labels);
        }

    }, []);


    const onFinish = async (values) => {
        const data = {
            task: {
                id: taskData.task.id,
                name: values.taskName,
                description: values.description,
                dueDate: values.date.$d
            },
            addUserIds,
            addLabelIds,
            removeLabelIds,
            removeUserIds
        }

        try {
            setApiProgress(true);
            await updateTask(data);
            dispatch(refreshTaskAction(true));
            setEditTask(false);
            setApiProgress(false);
        } catch (error) {
            
        }
    }


    return (
        <>
            <Form
                name="basic"
                onFinish={onFinish}
                autoComplete="off">
                <Flex>
                    <ReadOutlined style={{ fontSize: 20, marginRight: 5 }} />
                    <h3 style={{ color: '#7b818f', margin: 0 }}>Görev adı</h3>
                </Flex>
                <Form.Item
                    name="taskName"
                    initialValue={taskData.task.name}
                    rules={[
                        {
                            required: true,
                            message: 'Lütfen boş bırakmayınız!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <div style={{ marginTop: 50 }}>
                    <Row>
                        <Col md={8}>
                            <h3 style={{ color: '#7b818f', margin: 0 }}>Bitiş tarihi</h3>
                            <Flex>
                                <FieldTimeOutlined style={{ fontSize: 16, marginRight: 5 }} />
                                <Form.Item
                                    name="date"
                                    style={{ marginTop: 20 }}
                                    initialValue={dayjs(taskData.task.dueDate)}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Lütfen boş bırakmayınız!',
                                        },
                                    ]}
                                >
                                    <DatePicker placeholder={["Bitiş tarihi"]} />
                                </Form.Item>
                            </Flex>
                        </Col>


                        <Col md={8}>
                            <h3 style={{ color: '#7b818f', margin: 0 }}>Etiketler</h3>
                            <Space style={{ marginTop: 15 }}>
                                <DebounceSelect
                                    mode="multiple"
                                    value={initialTaskLabels}
                                    placeholder="Etiket seç"
                                    customOptions={taskLabels}
                                    onDeselect={onLabelDeselect}
                                    onSelect={onLabelSelect}
                                    onChange={(e) => setInitialTaskLabels(e)}
                                    style={{
                                        width: '170px',
                                    }}
                                />
                            </Space>
                        </Col>


                        <Col md={8}>
                            <h3 style={{ color: '#7b818f', margin: 0 }}>Üyeler</h3>
                            <Space style={{ marginTop: 15 }}>
                                <DebounceSelect
                                    mode="multiple"
                                    value={initialTaskMembers}
                                    placeholder="Kullanıcı ara"
                                    fetchOptions={SearchUserList}
                                    onDeselect={onMemberDeselect}
                                    onSelect={onMemberSelect}
                                    onChange={(e) => setInitialTaskMembers(e)}
                                    style={{
                                        width: '170px',
                                    }}
                                />
                            </Space>

                        </Col>

                    </Row>



                    <Flex style={{ marginTop: 20 }}>
                        <AlignLeftOutlined style={{ fontSize: 16 }} />
                        <h3 style={{ color: '#7b818f', marginLeft: 5 }}>Açıklama</h3>
                    </Flex>
                    <Form.Item
                        name="description"
                        initialValue={taskData.task.description}
                        rules={[
                            {
                                required: true,
                                message: 'Lütfen boş bırakmayınız!',
                            },
                        ]}
                    >
                        <Input.TextArea rows={8} />
                    </Form.Item>


                    <Form.Item>
                        <Button style={{ background: '#1fc5b5', marginBottom: 20 }} type="primary" htmlType="submit" loading={apiProgress}>
                            Kaydet
                        </Button> <br />
                    </Form.Item>
                </div>
            </Form>



        </>
    )
}

export default UpdateTask