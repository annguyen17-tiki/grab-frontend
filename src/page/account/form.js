import React from 'react';
import { Modal, Form, Input } from 'antd';
import { REQUIRED } from '../../common/validation';

export const AccountForm = ({ visible, onConfirm, onCancel }) => {
    const [form] = Form.useForm();

    return (
        <Modal
            open={visible}
            title="Thông tin tài khoản"
            okText="Lưu"
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
                    rules={[REQUIRED]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Mật khẩu"
                    rules={[REQUIRED]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="lastname"
                    label="Họ"
                    rules={[REQUIRED]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="firstname"
                    label="Tên"
                    rules={[REQUIRED]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="address"
                    label="Địa chỉ"
                    rules={[REQUIRED]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="license"
                    label="Số CCHN"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="hospital"
                    label="Bệnh viện công tác"
                    rules={[REQUIRED]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="major"
                    label="Chuyên khoa"
                    rules={[REQUIRED]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="university"
                    label="Đại học"
                    rules={[REQUIRED]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};
