import React, { useState, useEffect } from 'react';
import { useRealTimeNotifications } from '../../hooks/useRealTimeNotifications';
import styles from './RealTimeNotifications.module.css';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  timestamp: Date;
}

const RealTimeNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { isConnected } = useRealTimeNotifications();

  const addNotification = (type: Notification['type'], message: string) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: new Date(),
    };

    setNotifications(prev => [newNotification, ...prev.slice(0, 4)]); // Keep only last 5 notifications

    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '📢';
    }
  };

  const getNotificationClass = (type: Notification['type']) => {
    return `${styles.notification} ${styles[type]}`;
  };

  if (!isConnected) {
    return null;
  }

  return (
    <div className={styles.notificationsContainer}>
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={getNotificationClass(notification.type)}
          onClick={() => removeNotification(notification.id)}
        >
          <div className={styles.notificationIcon}>
            {getNotificationIcon(notification.type)}
          </div>
          <div className={styles.notificationContent}>
            <p className={styles.notificationMessage}>{notification.message}</p>
            <span className={styles.notificationTime}>
              {notification.timestamp.toLocaleTimeString()}
            </span>
          </div>
          <button
            className={styles.closeButton}
            onClick={(e) => {
              e.stopPropagation();
              removeNotification(notification.id);
            }}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default RealTimeNotifications;
