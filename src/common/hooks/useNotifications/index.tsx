import { useContext } from "react";
import { NotificationsContext } from "../../providers/notifications";

function useNotifications() {
  const { addNotification, removeNotification, notification } = useContext(
    NotificationsContext
  );
  return { addNotification, removeNotification, notification };
}

export default useNotifications;
