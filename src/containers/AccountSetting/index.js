import React, { useEffect } from 'react';
import { Button, Form, Input, notification } from 'antd';
import Title from "antd/es/typography/Title"
import { accountAPI } from '../../api/account';
import { formatRole } from '../../common/helper';



export const AccountSettingContainer = () => {
    const [form] = Form.useForm();

    useEffect(() => {
        accountAPI.getOwn()
            .then(response => {
                form.setFieldsValue({
                    id: response.id,
                    firstname: response.firstname,
                    lastname: response.lastname,
                    role: formatRole(response.role),
                })
            })
            .catch(() => notification.error({ message: 'Có lỗi xảy ra' }))
    }, [])

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
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 18 }}
                style={{ padding: '20px 0px' }}
                name="form_in_modal"
            >
                <Form.Item
                    name="id"
                    label="Mã định danh"
                >
                    <Input disabled />
                </Form.Item>
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
                <Form.Item
                    wrapperCol={{ offset: 4, span: 16 }}
                >
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
                </Form.Item>

            </Form>
        </>
    )
}
