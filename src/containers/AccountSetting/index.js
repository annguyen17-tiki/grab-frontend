import React, { useEffect, useState } from 'react';
import { Button, Form, Input, notification } from 'antd';
import Title from "antd/es/typography/Title"
import { accountAPI } from '../../api/account';
import { formatRole } from '../../common/helper';
import { saveFCMToken } from '../../common/firebase';



export const AccountSettingContainer = () => {
    const [form] = Form.useForm();
    const [account, setAccount] = useState({})

    useEffect(() => {
        accountAPI.getOwn()
            .then(response => setAccount(response))
            .catch(() => notification.error({ message: 'Có lỗi xảy ra' }))
    }, [])

    form.setFieldsValue({
        'firstname': account.firstname,
        'lastname': account.lastname,
        'role': formatRole(account.role),
    })

    const onSaveAccount = (payload) => {
        accountAPI.update(payload)
            .then(() => notification.success({ message: 'Cập nhật thành công' }))
            .catch(() => notification.error({ message: 'Có lỗi xảy ra' }))
    };

    return (
        <>
            <Title>Thông tin Tài khoản</Title>
            <Form
                form={form}
                layout='horizontal'
                labelCol={{ span: 2 }}
                wrapperCol={{ span: 5 }}
                name="form_in_modal"
            >
                <Form.Item
                    name="firstname"
                    label="Tên"
                    required
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="lastname"
                    label="Họ"
                    required
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="role"
                    label="Vai trò"
                >
                    <Input disabled />
                </Form.Item>
                <Button
                    type='primary'
                    onClick={() => {
                        form.validateFields().then((value) => {
                            form.resetFields()
                            onSaveAccount(value)
                        })
                    }}
                >
                    Lưu
                </Button>
            </Form>
            <Button onClick={() => { saveFCMToken() }}>
                Register token
            </Button>
        </>
    )
}
