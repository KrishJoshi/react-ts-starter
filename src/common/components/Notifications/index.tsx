import React from "react";
import useNotifications from "../../hooks/useNotifications";
import { NotificationType } from "../../providers/notifications";
import { DismissNotification, NotificationMessage } from "./styles";

const Notifications = () => {
  const { removeNotification, notification } = useNotifications();

  const onClose = () => {
    removeNotification();
  };

  return (
    notification && (
      <NotificationMessage>
        {notification.type === NotificationType.SUCCESS && "✅"}
        {notification.type === NotificationType.ERROR && "🔴"}
        {notification.message}
        <DismissNotification onClick={onClose}>x</DismissNotification>
      </NotificationMessage>
    )
  );
};

export default Notifications;
