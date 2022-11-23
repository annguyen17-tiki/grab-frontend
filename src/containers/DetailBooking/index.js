import { Button, Card, Descriptions, notification, Space } from "antd"
import Title from "antd/es/typography/Title"
import React, { useEffect, useState } from "react"
import { bookingAPI } from "../../api/booking"
import { useParams } from 'react-router';
import { formatAccountName, formatBookingStatus, formatVehicle } from '../../common/helper'
import { accountAPI } from "../../api/account";

export const DetailBookingContainer = () => {
    const params = useParams()
    const bookingID = params.id
    const [booking, setBooking] = useState({})
    const [account, setAccount] = useState({})
    const [disableButton, setDisableButton] = useState(false)

    useEffect(() => {
        bookingAPI.get(bookingID)
            .then(response => setBooking(response))
            .catch(() => notification.error({ message: 'Có lỗi xảy ra' }))
        accountAPI.getOwn()
            .then(response => setAccount(response))
            .catch(() => notification.error({ message: 'Có lỗi xảy ra' }))
    }, [])

    if (booking.status === 'new' && account.role === 'driver') {
        for (let i in booking.offers) {
            if (booking.offers[i].driver_id === account.id) {
                setDisableButton(false)
                break;
            }
        }
    }

    const onAcceptBooking = () => {
        bookingAPI.accept(bookingID)
            .then(() => {
                setDisableButton(true)
                notification.success({ message: 'Bạn đã nhận chuyến xe thành công. Vui lòng đợi hệ thống xác nhận' })
            })
            .catch(() => notification.error({ message: 'Có lỗi xảy ra' }))
    }

    const onDoneBooking = () => {
        bookingAPI.done(bookingID)
            .then(() => {
                setDisableButton(true)
                notification.success({ message: 'Bạn đã hoàn thành chuyến xe' })
            })
            .catch(() => notification.error({ message: 'Có lỗi xảy ra' }))
    }

    return (
        <>
            <Title>Thông tin Chuyến xe</Title>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                <Card title="Thông tin đặt xe" size="medium">
                    <Descriptions layout="horizontal" column={2}>
                        <Descriptions.Item label="Địa điểm khởi hành" style={{ width: "100%" }}>
                            {`(${booking.from_latitude}, ${booking.from_longitude})`}
                        </Descriptions.Item>
                        <Descriptions.Item label="Địa điểm đến" style={{ width: "100%" }}>
                            {`(${booking.to_latitude}, ${booking.to_longitude})`}
                        </Descriptions.Item>
                        <Descriptions.Item label="Người dùng" style={{ width: "100%" }}>
                            {booking.user ? formatAccountName(booking.user) : ''}
                        </Descriptions.Item>
                        <Descriptions.Item label="Tài xế" style={{ width: "100%" }}>
                            {booking.driver ? formatAccountName(booking.driver) : 'Không có'}
                        </Descriptions.Item>
                        <Descriptions.Item label="Loại xe" style={{ width: "100%" }}>
                            {booking.vehicle ? formatVehicle(booking.vehicle) : 'Không có'}
                        </Descriptions.Item>
                        <Descriptions.Item label="Trạng thái chuyến xe" style={{ width: "100%" }}>
                            {formatBookingStatus(booking.status)}
                        </Descriptions.Item>
                    </Descriptions>
                </Card>

            </Space>
            <Space direction="horizontal" size="middle" style={{ display: 'flex', margin: '24px 24px 24px 24px' }}>
                <Button
                    type='primary'
                    disabled={disableButton}
                    onClick={onAcceptBooking}
                >
                    Nhận chuyến
                </Button>
                <Button
                    disabled={disableButton}
                    onClick={onDoneBooking}
                >
                    Hoàn thành
                </Button>
            </Space>
        </>
    )
}