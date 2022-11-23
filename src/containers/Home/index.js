import React from 'react';
import { Button, Form, InputNumber, notification } from 'antd';
import { bookingAPI } from '../../api/booking';
import Title from 'antd/es/typography/Title';
import { REQUIRED } from '../../common/validation';


export const HomeContainer = () => {
    const [form] = Form.useForm();

    const onCreateBooking = (payload) => {
        bookingAPI.create(payload)
            .then(() => notification.success({ message: 'Đặt xe thành công' }))
            .catch(() => notification.error({ message: 'Có lỗi xảy ra' }))
    }

    return (
        <>
            <Title>Thông tin đặt xe</Title>
            <Form
                form={form}
                labelCol={{ span: 5 }}
                layout="horizontal"
                name="form_in_modal"
            >
                <Form.Item
                    name="from_longitude"
                    label="Kinh độ điểm đón"
                    rules={[REQUIRED]}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    name="from_latitude"
                    label="Vĩ độ điểm đón"
                    rules={[REQUIRED]}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    name="to_longitude"
                    label="Kinh độ điểm đến"
                    rules={[REQUIRED]}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    name="to_latitude"
                    label="Vĩ độ điểm đến"
                    rules={[REQUIRED]}
                >
                    <InputNumber />
                </Form.Item>
                <Button
                    type='primary'
                    onClick={() => {
                        form.validateFields().then((value) => {
                            form.resetFields()
                            onCreateBooking(value)
                        })
                    }}
                >Đặt xe</Button>
            </Form>
        </>
    )
}