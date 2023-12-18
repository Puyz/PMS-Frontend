import React from 'react'
import LoginForm from '../../components/login/LoginForm'
import { Row, Col } from 'antd'
import './Login.css';


const Login = () => {

    return (
        <div>
            <Row>
                <Col md={12}>
                    <div className='log-img'>
                        <img width={500} src={require("../../assets/login.jpg")} />
                    </div>
                </Col>
                <Col md={12}>
                    <div className='log-form'>
                        <LoginForm /> 
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Login