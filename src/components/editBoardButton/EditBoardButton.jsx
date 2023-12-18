import { Button, Drawer, Form, Input, Switch, message, DatePicker } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateBoard } from '../../api/ApiCalls';
import { CheckOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';
import { refreshBoardAction } from '../../redux/AuthActions';
import dayjs from 'dayjs';


const EditBoardButton = ({board}) => {

    const [messageApi, contextHolder] = message.useMessage();
    const [apiProgress, setApiProgress] = useState(false);
    const dispatch = useDispatch();

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
            id: board.id,
            name: values.name,
            privateToWorkspaceMember: values.private,
            endDate: values.date.$d
        }

        console.log(data)
        try {
            setApiProgress(true);
            await updateBoard(data);
            messageApi.open({
                type: 'success',
                content: 'Pano düzenlendi',
            });
            onClose();
            dispatch(refreshBoardAction(true));

        } catch (error) {
            messageApi.open({
                type: 'error',
                content: 'pano düzenlenirken hata meydana geldi',
            });

        }
        finally {
            setApiProgress(false);
        }
        
    };


    return (
        <>
            {contextHolder}
            <EditOutlined key="edit" onClick={showDrawer}/>
            <Drawer title="Pano düzenle" placement="right" onClose={onClose} open={open}>
                <div className='form'>
                    <Form
                        name="basic"
                        onFinish={onFinish}
                        autoComplete="off"
                        style={{ width: 300, margin: '200px auto' }}
                    >

                        <Form.Item
                            name="name"
                            initialValue={board.name}
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
                            initialValue={board.privateToWorkspaceMember}
                        >

                            <Switch
                                checkedChildren={<CheckOutlined />}
                                unCheckedChildren={<CloseOutlined />}
                            />
                        </Form.Item>

                        <Form.Item
                            name="date"
                            initialValue={dayjs(board.endDate)}
                            rules={[
                                {
                                    required: true,
                                    message: 'Lütfen boş bırakmayınız!',
                                },
                            ]}
                        >
                            <DatePicker placeholder={["Bitiş tarihi"]}/>
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

export default EditBoardButton