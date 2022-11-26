import React, { useEffect, useState } from 'react';
import { Descriptions, List, Button, notification } from 'antd';
import { formatTime, formatBookingStatus, formatAccountName } from '../../common/helper'
import { bookingAPI } from '../../api/booking';
import Title from 'antd/es/typography/Title';
import { BOOKING_PAGE } from '../../common/constant';



export const ListingBookingContainer = () => {
    const [bookings, setBookings] = useState([])

    useEffect(() => {
        bookingAPI.search()
            .then(response => setBookings(response))
            .catch(() => notification.error({ message: 'Có lỗi xảy ra' }))
    }, [])

    const DetailButton = ({ booking }) => (
        <Button
            type='primary'
            onClick={() => window.location.href = `${BOOKING_PAGE}/${booking.id}`}
        >
            Chi tiết
        </Button>
    )


    return (
        <>
            <Title>Lịch sử đặt xe</Title>
            <List
                itemLayout='horizontal'
                dataSource={bookings}
                pagination
                renderItem={booking => (
                    <List.Item
                        extra={<DetailButton booking={booking} />}
                    >
                        <Descriptions
                            layout="horizontal"
                            column={4}
                        >
                            <Descriptions.Item label='Khách hàng'>{formatAccountName(booking.user)}</Descriptions.Item>
                            <Descriptions.Item label='Tài xế'>{booking.driver ? formatAccountName(booking.driver) : 'Không có'}</Descriptions.Item>
                            <Descriptions.Item label='Trạng thái'>{formatBookingStatus(booking.status)}</Descriptions.Item>
                            <Descriptions.Item label='Ngày'>{formatTime(booking.created_at)}</Descriptions.Item>
                        </Descriptions>
                    </List.Item>
                )}
            />
        </>
    )
}
