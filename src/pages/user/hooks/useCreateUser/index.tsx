import { usePost } from "../../../../common/hooks/useApi";
import { USERS } from "../../../../common/urls";
import useNotifications from "../../../../common/hooks/useNotifications";
import { NotificationType } from "../../../../common/providers/notifications";

const useCreateUser = () => {
  const api = usePost<User>(USERS);
  const notify = useNotifications();

  async function save(payload: User) {
    try {
      await api.post({
        payload,
      });
      notify.addNotification("User Created", NotificationType.SUCCESS);
    } catch (e) {
      notify.addNotification(
        `Error while creating user:${e}`,
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
export default useCreateUser;
