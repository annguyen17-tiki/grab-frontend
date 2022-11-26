import { notification } from "antd";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { tokenAPI } from "../api/token";
import { FIREBASE_VAPID_KEY } from "./constant";

const firebaseConfig = {
    apiKey: "AIzaSyAMqee9Jt8WUuQZxseakcIjZqZw-Mzstyk",
    authDomain: "grab-tkpmnc.firebaseapp.com",
    projectId: "grab-tkpmnc",
    storageBucket: "grab-tkpmnc.appspot.com",
    messagingSenderId: "14747209006",
    appId: "1:14747209006:web:ba3929ff9bc08fab533ebf"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);


export const saveFCMToken = () => {
    getToken(messaging, { vapidKey: FIREBASE_VAPID_KEY })
        .then((token) => {
            if (token) {
                tokenAPI.save(token)
                    .then(() => notification.success({ message: 'Lưu FCM token thành công' }))
                    .catch(() => notification.error({ message: 'Lưu FCM token thất bại' }))
            }
        })
        .catch((err) => {
            notification.error({ message: 'Không thể đăng ký FCM token' })
            console.log('An error occurred while retrieving token. ', err);
        })
}
