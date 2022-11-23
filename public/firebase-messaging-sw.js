importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

let config = {
    apiKey: "AIzaSyAMqee9Jt8WUuQZxseakcIjZqZw-Mzstyk",
    authDomain: "grab-tkpmnc.firebaseapp.com",
    projectId: "grab-tkpmnc",
    storageBucket: "grab-tkpmnc.appspot.com",
    messagingSenderId: "14747209006",
    appId: "1:14747209006:web:ba3929ff9bc08fab533ebf"
};
firebase.initializeApp(config);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    return self.registration.showNotification();
});
