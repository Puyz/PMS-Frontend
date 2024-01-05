import React from 'react'
import { Row, Col } from 'antd'
import RegisterForm from '../../components/register/RegisterForm'

const Register = () => {
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
                        <RegisterForm /> 
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Register