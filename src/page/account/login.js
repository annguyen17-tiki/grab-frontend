import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { accountAPI } from "../../api/account"
import { REQUIRED } from '../../common/validation';
import '../../App.css';
import { AccountForm } from './form';
import { LANDING_PAGE } from '../../common/constant';


export const LoginPage = () => {
    const [visible, setVisible] = useState(false);

    const onLogin = (values) => {
        accountAPI.login(values).then(token => {
            localStorage.setItem('token', token);
            window.location.href = LANDING_PAGE
        }).catch(err => console.error(err))
    };

    const onSubmitFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onRegister = () => {
        setVisible(true)
    }

    const onCreateAccount = (values) => {
        accountAPI.create(values).catch(err => console.error(err))
        setVisible(false)
    }

    const onCancelModel = () => {
        setVisible(false);
    }

    return (
        <Form
            name="basic"
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onLogin}
            onFinishFailed={onSubmitFailed}
            autoComplete="off"
            style={{padding: "100px 20%"}}
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[REQUIRED]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[REQUIRED]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 4,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit" className="login-form-button">Đăng nhập</Button>
            </Form.Item>
            <Button type="link" onClick={onRegister} block>Tạo tài khoản</Button>
            <AccountForm visible={visible} onConfirm={onCreateAccount} onCancel={onCancelModel} />
        </Form>
    );
}