import React from 'react';
import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const DECK_NOTIFICATION_KEY = 'MobileFlashCards:notifications';

export function clearLocalNotification () {
  return AsyncStorage.removeItem(DECK_NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
  return {
    title: 'Time to study!',
    body: "👋 don't forget to study today!",
    ios: {
      sound: true,
    },
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(DECK_NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(9)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(DECK_NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}