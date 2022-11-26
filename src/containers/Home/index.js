import React, { useEffect, useState } from 'react';
import { Button, Form, AutoComplete, notification, InputNumber } from 'antd';
import { bookingAPI } from '../../api/booking';
import Title from 'antd/es/typography/Title';
import { geoAPI } from '../../api/geoapify';


export const HomeContainer = () => {
    const [form] = Form.useForm();
    const [searchText, setSearchText] = useState('')
    const [options, setOptions] = useState([])

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (!searchText) return

            geoAPI.autocomplete(searchText)
                .then(opts => setOptions(opts))
                .catch(() => notification.error({ message: 'Có lỗi xảy ra' }))
        }, 1000)

        return () => clearTimeout(delayDebounceFn)
    }, [searchText])

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
                wrapperCol={{ span: 16 }}
                style={{ padding: '20px 0px' }}
                layout="horizontal"
                name="form_in_modal"
            >
                <Form.Item
                    name='from_address'
                    label='Địa điểm nhận khách'
                    required
                >
                    <AutoComplete
                        options={options}
                        allowClear={true}
                        onSearch={(value) => setSearchText(value)}
                        onSelect={(value, option) => {
                            form.setFieldValue('from_latitude', option.latitude)
                            form.setFieldValue('from_longitude', option.longitude)
                            setOptions([])
                        }}
                    />
                </Form.Item>
                <Form.Item
                    name='to_address'
                    label='Địa điểm trả khách'
                    required
                >
                    <AutoComplete
                        options={options}
                        allowClear={true}
                        onSearch={(value) => setSearchText(value)}
                        onSelect={(value, option) => {
                            form.setFieldValue('to_latitude', option.latitude)
                            form.setFieldValue('to_longitude', option.longitude)
                            setOptions([])
                        }}
                    />
                </Form.Item>
                <Form.Item
                    name='from_latitude'
                    label='from_latitude'
                    hidden
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    name='from_longitude'
                    label='from_longitude'
                    hidden
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    name='to_latitude'
                    label='to_latitude'
                    hidden
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    name='to_longitude'
                    label='to_longitude'
                    hidden
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    wrapperCol={{ offset: 5, span: 16 }}
                >
                    <Button
                        type='primary'
                        onClick={() => {
                            form.validateFields().then((value) => {
                                onCreateBooking(value)
                            })
                        }}
                    >
                        Đặt xe
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}