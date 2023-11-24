"use client"

import { useEffect } from 'react';

function useBrowserNotification(title: string, options?: NotificationOptions) {
    useEffect(() => {
        if (!("Notification" in window)) {
            console.log("This browser does not support desktop notification");
        } else if (Notification.permission === "granted") {
            new Notification(title, options);
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                    new Notification(title, options);
                }
            });
        }
    }, [title, options]);
}

export default useBrowserNotification;
