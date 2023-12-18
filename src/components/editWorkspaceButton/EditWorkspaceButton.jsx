import { Button, Drawer, Form, Input, Switch, message, DatePicker, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateWorkspace, getAllWorkspaceType } from '../../api/ApiCalls';
import { refreshWorkspaceAction } from '../../redux/AuthActions';
import { EditOutlined } from '@ant-design/icons';

const AddWorkspaceButton = ({workspace}) => {

    const [messageApi, contextHolder] = message.useMessage();
    const [apiProgress, setApiProgress] = useState(false);
    const dispatch = useDispatch();

    const [workspaceTypes, setWorkspaceTypes] = useState([]);

    useEffect(() => {
        async function getAllTypes() {
            try {
                const response = await getAllWorkspaceType();
                const types = response.data.data.map(type => ({
                    value: type.id,
                    label: type.name,
                }));
                setWorkspaceTypes(types);
            } catch (error) {
                console.error('Veri getirme hatası:', error);
            }
        }

        getAllTypes();
    }, []);

    const { userId } = useSelector((store) => {
        return {
            userId: store.id
        }
    });
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const onFinish = async (values) => {
        if (values.private === undefined) {
            values.private = false;
        }
        const data = {
            id: workspace.id,
            name: values.name,
            workspaceTypeId: values.type,
            createdUserId: userId,
            description: values.description
        }
        try {
            setApiProgress(true);
            await updateWorkspace(data);
            messageApi.open({
                type: 'success',
                content: 'Çalışma alanı düzenlendi',
            });
            onClose();
            dispatch(refreshWorkspaceAction(true));

        } catch (error) {
            messageApi.open({
                type: 'error',
                content: 'Çalışma alanı düzenlenirken hata meydana geldi',
            });

        }
        finally {
            setApiProgress(false);
        }


    };


    return (
        <>
            {contextHolder}
            <EditOutlined onClick={showDrawer} style={{fontSize: 16, marginRight: 20}}/>
            <Drawer title="Çalışma alanı düzenle" placement="right" onClose={onClose} open={open}>
                <div className='form'>
                    <Form
                        name="basic"
                        onFinish={onFinish}
                        autoComplete="off"
                        style={{ width: 300, margin: '200px auto' }}
                    >

                        <Form.Item
                            name="name"
                            initialValue={workspace.name}
                            rules={[
                                {
                                    required: true,
                                    message: 'Lütfen boş bırakmayınız!',
                                },
                            ]}
                        >
                            <Input placeholder="Çalışma alanı adı" />
                        </Form.Item>

                        <Form.Item
                            name="type"
                            initialValue={workspace.workspaceTypeId}
                        >

                            <Select
                                placeholder="Tür"
                                style={{
                                    width: 120,
                                }}
                                options={workspaceTypes}
                            />
                        </Form.Item>

                        <Form.Item
                            name="description"
                            initialValue={workspace.description}
                            rules={[
                                {
                                    required: true,
                                    message: 'Lütfen boş bırakmayınız!',
                                },
                            ]}
                        >
                            <Input.TextArea
                                placeholder="Açıklama"
                                autoSize={{
                                    minRows: 3,
                                    maxRows: 6,
                                }}
                            />
                        </Form.Item>




                        <Form.Item>
                            <Button style={{ background: '#1fc5b5', marginBottom: 20 }} type="primary" htmlType="submit" loading={apiProgress}>
                                Kaydet
                            </Button> <br />
                        </Form.Item>
                    </Form>
                </div>
            </Drawer>
        </>
    )
}

export default AddWorkspaceButton