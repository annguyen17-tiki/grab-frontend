import React, { useEffect, useState } from 'react';
import { Button, Form, InputNumber, AutoComplete, notification } from 'antd';
import { locationAPI } from '../../api/location';
import Title from 'antd/es/typography/Title';
import { geoAPI } from '../../api/geoapify';



export const SaveLocationContainer = () => {
    const [form] = Form.useForm()
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

    useEffect(() => {
        locationAPI.getOwn()
            .then(response => {
                form.setFieldsValue({
                    address: response.address,
                    latitude: response.latitude,
                    longitude: response.longitude,
                })
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    notification.info({ message: 'Vui lòng cập nhật vị trí' })
                    return
                }
                notification.error({ message: 'Có lỗi xảy ra' })
            })
    }, [])

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
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 18 }}
                style={{ padding: '20px 0px' }}
                layout="horizontal"
                name="form_in_modal"
            >
                <Form.Item
                    name='address'
                    label='Địa điểm'
                >
                    <AutoComplete
                        options={options}
                        allowClear={true}
                        onSearch={(value) => setSearchText(value)}
                        onSelect={(value, option) => {
                            form.setFieldValue('latitude', option.latitude)
                            form.setFieldValue('longitude', option.longitude)
                            setOptions([])
                        }}
                    />
                </Form.Item>
                <Form.Item
                    name="latitude"
                    label="Kinh độ"
                    required
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    name="longitude"
                    label="Vĩ độ"
                    required
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    wrapperCol={{ offset: 4, span: 16 }}
                >
                    <Button
                        type='primary'
                        onClick={() => {
                            form.validateFields().then((value) => {
                                onSaveLocation(value)
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