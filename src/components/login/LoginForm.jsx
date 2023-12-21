import React, { useState } from 'react'
import { Button, Form, Input } from 'antd';
import './LoginForm.css';
import { loginRequest } from '../../api/ApiCalls';
import { useDispatch } from 'react-redux';
import { loginHandler } from '../../redux/AuthActions';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    const onFinish = async (values) => {
        const credentials = {
            Email: values.email,
            Password: values.password
        }
        try {
            const response = await dispatch(loginHandler(credentials));
            navigate("/");

            
        } catch (error) {
            console.log("başarısız");
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div  className='form'>
            
            <Form
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                style={{width: 300, margin: '200px auto'}}
            >
                <img src={require("../../assets/logo.png")}  className='logo' />
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Lütfen boş bırakmayınız!',
                        },
                    ]}
                >
                    <Input  placeholder="Email"/>
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
                    <Button style={{background: '#1fc5b5'}} type="primary" htmlType="submit">
                        Giriş yap
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default LoginForm