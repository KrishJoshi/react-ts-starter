import React from "react";
import useNotifications from "../../hooks/useNotifications";
import { NotificationType } from "../../providers/notifications";
import { DismissToast, ToastMessage } from "./styles";

const Toast = () => {
  const { removeNotification, notification } = useNotifications();

  const onClose = () => {
    removeNotification();
  };

  return (
    notification && (
      <ToastMessage>
        {notification.type === NotificationType.SUCCESS && "✅"}
        {notification.type === NotificationType.ERROR && "🔴"}
        {notification.message}
        <DismissToast id="close-btn" onClick={onClose}>
          x
        </DismissToast>
      </ToastMessage>
    )
  );
};

export default Toast;
