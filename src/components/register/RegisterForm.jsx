import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerRequest } from '../../api/ApiCalls';
import { Button, Form, Input, message } from 'antd';

const RegisterForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const onFinish = async (values) => {
        const credentials = {
            email: values.email,
            name: values.name,
            password: values.password
        }
        try {
            await registerRequest(credentials);
            message.success("Kayıt başarılı. Giriş yapabilirsiniz.")
            navigate("/login");


        } catch (error) {
            console.log("başarısız");
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='form'>

            <Form
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                style={{ width: 300, margin: '200px auto' }}
            >
                <img src={require("../../assets/logo.png")} className='logo' />
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Lütfen boş bırakmayınız!',
                        },
                    ]}
                >
                    <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Lütfen boş bırakmayınız!',
                        },
                    ]}
                >
                    <Input placeholder="İsim" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Lütfen boş bırakmayınız!',
                        },
                    ]}
                >
                    <Input.Password placeholder='Şifre' />
                </Form.Item>



                <Form.Item>
                    <Button style={{ background: '#1fc5b5' }} type="primary" htmlType="submit">
                        Kayıt ol
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default RegisterForm