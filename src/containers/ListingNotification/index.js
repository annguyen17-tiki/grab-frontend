import React, { useState, useEffect } from 'react';
import { Button, List, notification } from 'antd';
import { notificationAPI } from '../../api/notification';
import Title from 'antd/es/typography/Title';
import { Link } from 'react-router-dom';
import { saveFCMToken } from '../../common/firebase';


export const ListingNotificationContainer = () => {
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        notificationAPI.search({})
            .then((response) => { setNotifications(response) })
            .catch(() => notification.error({ message: 'Có lỗi xảy ra' }))
    }, [])

    const TurnOnNotiButton = () => (
        <Button
            onClick={() => { saveFCMToken() }}
            type='primary'
        >
            Nhận thông báo
        </Button>
    )

    return (
        <>
            <Title>Thông báo</Title>
            <List
                itemLayout='horizontal'
                header={<TurnOnNotiButton />}
                dataSource={notifications}
                pagination
                renderItem={noti => (
                    <List.Item
                        extra={<SeenButton noti={noti} />}
                    >
                        <List.Item.Meta
                            title={<Link to={`/bookings/${noti.content.booking_id}`}>{noti.content.title}</Link>}
                            description={noti.content.message}
                        />
                    </List.Item>
                )}
            />
        </>
    )
}

const SeenButton = ({ noti }) => {
    const [disabled, setDisabled] = useState(noti.status === 'seen')

    const onSeenNoti = () => {
        notificationAPI.seen(noti.id)
            .then(() => notification.success({ message: 'Đã xem tin nhắn' }))
            .catch(() => notification.error({ message: 'Có lỗi xảy ra' }))

        setDisabled(true)
    }


    return (
        <Button
            type='primary'
            onClick={onSeenNoti}
            disabled={disabled}
        >
            Đã xem
        </Button>
    )
}