import React from 'react';
import { Button, Form, InputNumber, notification } from 'antd';
import { locationAPI } from '../../api/location';
import Title from 'antd/es/typography/Title';
import { REQUIRED } from '../../common/validation';


export const SaveLocationContainer = () => {
    const [form] = Form.useForm();

    const onSaveLocation = (payload) => {
        locationAPI.save(payload)
            .then(() => notification.success({ message: 'Lưu vị trí thành công' }))
            .catch(err => notification.error({ message: 'Có lỗi xảy ra' }))
    };

    return (
        <>
            <Title> Cập nhật Vị trí</Title>
            <Form
                form={form}
                labelCol={{ span: 2 }}
                layout="horizontal"
                name="form_in_modal"
            >
                <Form.Item
                    name="longitude"
                    label="Kinh độ"
                    rules={[REQUIRED]}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    name="latitude"
                    label="Vĩ độ"
                    rules={[REQUIRED]}
                >
                    <InputNumber />
                </Form.Item>
                <Button
                    type='primary'
                    onClick={() => {
                        form.validateFields().then((value) => {
                            form.resetFields()
                            onSaveLocation(value)
                        })
                    }}
                >Lưu</Button>
            </Form>
        </>
    )
}