import React from 'react';
import { Modal, Form, Input } from 'antd';

export const AccountForm = ({ visible, onConfirm, onCancel }) => {
    const [form] = Form.useForm();

    return (
        <Modal
            open={visible}
            title="Thông tin tài khoản"
            okText="Tạo"
            cancelText="Hủy bỏ"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onConfirm(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                name="form_in_modal"
            >
                <Form.Item
                    name="username"
                    label="Tên đăng nhập"
                    required
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Mật khẩu"
                    required
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="lastname"
                    label="Họ"
                    required
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="firstname"
                    label="Tên"
                    required
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="address"
                    label="Địa chỉ"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="role"
                    label="Vai trò"
                    initialValue='user'
                >
                    <Input disabled />
                </Form.Item>
            </Form>
        </Modal>
    );
};
