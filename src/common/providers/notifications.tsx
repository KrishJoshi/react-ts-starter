import React, { useState, useCallback } from "react";

interface Props {
  children: any;
}

export enum NotificationType {
  ERROR,
  SUCCESS,
}

export interface NotificationPayload {
  message: string;
  type: NotificationType;
}

interface NotificationsContextProps {
  notification: NotificationPayload | null;
  addNotification: (message: string, type: NotificationType) => void;
  removeNotification: () => void;
}
export const NotificationsContext = React.createContext<
  NotificationsContextProps
>({
  notification: null,
  addNotification: () => {},
  removeNotification: () => {},
});

export default function NotificationsProvider({ children }: Props) {
  const [notification, setNotification] = useState<NotificationPayload | null>(
    null
  );

  const removeMessage = () => setNotification(null);

  const addMessage = (message: string, type: NotificationType) =>
    setNotification({ message, type });

  const contextValue: NotificationsContextProps = {
    notification,
    addNotification: useCallback(
      (message, type) => addMessage(message, type),
      []
    ),
    removeNotification: useCallback(() => removeMessage(), []),
  };

  return (
    <NotificationsContext.Provider value={contextValue}>
      {children}
    </NotificationsContext.Provider>
  );
}
