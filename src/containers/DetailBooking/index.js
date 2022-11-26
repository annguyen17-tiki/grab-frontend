import { Button, Form, Input, notification } from "antd"
import Title from "antd/es/typography/Title"
import React, { useEffect, useState } from "react"
import { bookingAPI } from "../../api/booking"
import { useParams } from 'react-router';
import { formatAccountName, formatBookingStatus, formatVehicle } from '../../common/helper'
import { accountAPI } from "../../api/account";

export const DetailBookingContainer = () => {
    const params = useParams()
    const bookingID = params.id
    const [form] = Form.useForm();
    const [booking, setBooking] = useState({})
    const [account, setAccount] = useState({})
    const [action, setAction] = useState('')

    useEffect(() => {
        bookingAPI.get(bookingID)
            .then(response => {
                setBooking(response)
                form.setFieldsValue({
                    id: response.id,
                    from_address: response.from_address,
                    to_address: response.to_address,
                    status: formatBookingStatus(response.status),
                    user: formatAccountName(response.user),
                    driver: formatAccountName(response.driver),
                    vehicle: formatVehicle(response.vehicle)
                })
            })
            .catch(() => notification.error({ message: 'Có lỗi xảy ra' }))
        accountAPI.getOwn()
            .then(response => setAccount(response))
            .catch(() => notification.error({ message: 'Có lỗi xảy ra' }))
    }, [action])

    const displayAcceptButton = (booking, account) => {
        if (account.role !== 'driver') return false

        if (booking.status !== 'new') return false

        for (const offer of booking.offers) {
            if (offer.driver_id === account.id) {
                return true
            }
        }

        return false
    }

    const displayDoneButton = (booking, account) => {
        if (account.role !== 'driver') return false

        if (booking.status !== 'confirm') return false

        for (const offer of booking.offers) {
            if (offer.driver_id === account.id && offer.status === 'confirm') {
                return true
            }
        }

        return false
    }

    const onAcceptBooking = () => {
        bookingAPI.accept(bookingID)
            .then(() => {
                notification.success({ message: 'Bạn đã nhận chuyến xe thành công. Vui lòng đợi hệ thống xác nhận' })
                setAction('accept')
            })
            .catch(() => notification.error({ message: 'Có lỗi xảy ra' }))
    }

    const onDoneBooking = () => {
        bookingAPI.done(bookingID)
            .then(() => {
                notification.success({ message: 'Bạn đã hoàn thành chuyến xe' })
                setAccount('done')
            })
            .catch(() => notification.error({ message: 'Có lỗi xảy ra' }))
    }

    return (
        <>
            <Title>Thông tin Chuyến xe</Title>
            <Form
                form={form}
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 17 }}
                style={{ padding: '20px 0px' }}
                layout="horizontal"
                name="form_in_modal"
            >
                <Form.Item
                    name='id'
                    label='Mã số chuyến đi'
                >
                    <Input readOnly />
                </Form.Item>
                <Form.Item
                    name='from_address'
                    label='Địa điểm nhận khách'
                >
                    <Input readOnly />
                </Form.Item>
                <Form.Item
                    name='to_address'
                    label='Địa điểm trả khách'
                >
                    <Input readOnly />
                </Form.Item>
                <Form.Item
                    name='user'
                    label='Khách hàng'
                >
                    <Input readOnly />
                </Form.Item>
                <Form.Item
                    name='status'
                    label='Trạng thái'
                >
                    <Input readOnly />
                </Form.Item>
                {booking.driver &&
                    <div>
                        <Form.Item
                            name='driver'
                            label='Tài xế'
                        >
                            <Input readOnly />
                        </Form.Item>
                        <Form.Item
                            name='vehicle'
                            label='Loại xe'
                        >
                            <Input readOnly />
                        </Form.Item>
                    </div>
                }
                {displayAcceptButton(booking, account) &&
                    <div>
                        <Form.Item
                            wrapperCol={{ offset: 5, span: 16 }}
                        >
                            <Button
                                type='primary'
                                onClick={onAcceptBooking}
                            >
                                Nhận chuyến
                            </Button>
                        </Form.Item>
                    </div>
                }
                {displayDoneButton(booking, account) &&
                    <div>
                        <Form.Item
                            wrapperCol={{ offset: 5, span: 16 }}
                        >
                            <Button
                                type='primary'
                                onClick={onDoneBooking}
                            >
                                Hoàn thành
                            </Button>
                        </Form.Item>
                    </div>
                }
            </Form>
        </>
    )
}