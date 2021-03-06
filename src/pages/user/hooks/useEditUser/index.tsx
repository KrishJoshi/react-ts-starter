import { usePut } from "../../../../common/hooks/useApi";
import { USERS } from "../../../../common/urls";
import useNotifications from "../../../../common/hooks/useNotifications";
import { NotificationType } from "../../../../common/providers/notifications";

const useEditUser = () => {
  const api = usePut<User>(USERS);
  const notify = useNotifications();

  async function save(payload: User) {
    try {
      await api.put({
        payload,
        urlExtra: payload.id,
      });
      notify.addNotification("User Updated", NotificationType.SUCCESS);
    } catch (e) {
      notify.addNotification(
        `Error while updating user:${api.errors}`,
        NotificationType.ERROR
      );
      api.reset();
    }
  }

  return {
    save,
    saving: api.loading,
  };
};
export default useEditUser;
