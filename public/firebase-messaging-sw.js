self.importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js')
self.importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js')
/*
Initialize the Firebase app in the service worker by passing in the messagingSenderId.
*/
self.firebase.initializeApp({
  apiKey: 'AIzaSyALiQ_6IC7ppLhAEqPd8aFncSkFIDO-ZSk',
  authDomain: 'test-beneat-chat.firebaseapp.com',
  projectId: 'test-beneat-chat',
  storageBucket: 'test-beneat-chat.appspot.com',
  messagingSenderId: '881075085799',
  appId: '1:881075085799:web:53d9a8d95d765d2f8add42',
  measurementId: 'G-9S46EVWL45'
})

//click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  console.log('notificationclick', event.notification?.data)

  const pathname = event.notification?.data?.FCM_MSG?.notification?.data?.link
  if (!pathname) return
  const url = new URL(pathname, self.location.origin).href

  event.waitUntil(
    self.clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientsArr) => {
        const hadWindowToFocus = clientsArr.some((windowClient) =>
          windowClient.url === url ? (windowClient.focus(), true) : false
        )

        if (!hadWindowToFocus) {
          self.clients
            .openWindow(url)
            .then((windowClient) =>
              windowClient ? windowClient.focus() : null
            )
        }
      })
  )
})

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = self.firebase.messaging()
messaging.onBackgroundMessage(function (payload) {
  console.log('Message onBackgroundMessage received.', payload)
  const title = payload.notification.title
  const options = {
    body: payload.notification.body,
    icon: '/images/beneat-chat-active-favicon.png'
  }
})
