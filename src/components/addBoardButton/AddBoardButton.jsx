import { Button, Drawer, Form, Input, Switch, message, DatePicker } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addBoard } from '../../api/ApiCalls';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { refreshBoardAction } from '../../redux/AuthActions';


const AddBoardButton = ({workspaceId}) => {

    const [messageApi, contextHolder] = message.useMessage();
    const [apiProgress, setApiProgress] = useState(false);
    const dispatch = useDispatch();
    const [form] = Form.useForm();

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
        if(values.private === undefined) {
            values.private = false;
        }
         const data = {
            workspaceId: workspaceId,
            createdUserId: userId,
            name: values.name,
            privateToWorkspaceMember: values.private,
            createdDate: values.date[0].$d,
            endDate: values.date[1].$d
        }

        try {
            setApiProgress(true);
            await addBoard(data);
            messageApi.open({
                type: 'success',
                content: 'Pano eklendi',
            });
            onClose();
            form.resetFields();
            dispatch(refreshBoardAction(true));

        } catch (error) {
            messageApi.open({
                type: 'error',
                content: 'Pano eklenirken hata meydana geldi',
            });

        }
        finally {
            setApiProgress(false);
        }
        
        
    };


    return (
        <>
            {contextHolder}
            <Button onClick={showDrawer}>Pano oluştur</Button>
            <Drawer title="Pano ekle" placement="right" onClose={onClose} open={open}>
                <div className='form'>
                    <Form
                        name="basic"
                        onFinish={onFinish}
                        autoComplete="off"
                        style={{ width: 300, margin: '200px auto' }}
                        form={form}
                    >

                        <Form.Item
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Lütfen boş bırakmayınız!',
                                },
                            ]}
                        >
                            <Input placeholder="Pano adı" />
                        </Form.Item>

                        <Form.Item
                            name="private"
                            label="Üyelere özel"
                            valuePropName="checked"
                            value="false"
                        >

                            <Switch
                                checkedChildren={<CheckOutlined />}
                                unCheckedChildren={<CloseOutlined />}
                            />
                        </Form.Item>

                        <Form.Item
                            name="date"
                            rules={[
                                {
                                    required: true,
                                    message: 'Lütfen boş bırakmayınız!',
                                },
                            ]}
                        >
                            <DatePicker.RangePicker placeholder={["Başlangıç tarihi","Bitiş tarihi"]}/>
                        </Form.Item>




                        <Form.Item>
                            <Button style={{ background: '#1fc5b5', marginBottom: 20 }} type="primary" htmlType="submit" loading={apiProgress}>
                                Oluştur
                            </Button> <br />
                        </Form.Item>
                    </Form>
                </div>
            </Drawer>
        </>
    )
}

export default AddBoardButton