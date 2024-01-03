import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Flex, Form, Input } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { addComment } from '../../api/ApiCalls'
import { useDispatch } from 'react-redux'
import { refreshTaskCommentsAction } from '../../redux/AuthActions'

const AddCommentForm = ({taskId}) => {

    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [apiProgress, setApiProgress] = useState(false);
    const { userId } = useSelector((store) => {
        return {
            userId: store.id
        }
    })
    

    const onFinish = async (values) => {
        setApiProgress(true);
        const comment = {
            taskId,
            userId,
            content: values.content
        }

        await addComment(comment);
        setApiProgress(false);
        dispatch(refreshTaskCommentsAction(true));
        form.resetFields();
    }
    return (
        <Flex>
            <Avatar
                style={{
                    backgroundColor: '#87d068',
                }}
                icon={<UserOutlined />}
            />


            <Form
                name="basic"
                onFinish={onFinish}
                autoComplete="off"
                form={form}
            >
                <Form.Item
                    name="content"
                    style={{ marginLeft: 10, width: '600px' }}
                    rules={[
                        {
                            required: true,
                            message: 'Lütfen boş bırakmayınız!',
                        },
                    ]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>

                <Form.Item>
                    <Button style={{ background: '#1fc5b5', marginLeft: 10 }} type="primary" htmlType="submit" loading={apiProgress}>
                        Yorum yap
                    </Button> <br />
                </Form.Item>

            </Form>
        </Flex>
    )
}

export default AddCommentForm