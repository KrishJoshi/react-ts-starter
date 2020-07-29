import { usePut } from "../../../../common/hooks/useApi";
import { USERS } from "../../../../common/urls";
import useNotifications from "../../../../common/hooks/useNotifications";
import { NotificationType } from "../../../../common/providers/notifications";

const useEditUser = () => {
  const api = usePut<User>(USERS);
  const notify = useNotifications();

  async function save(user: User) {
    try {
      const { payload } = await api.put({
        payload: user,
        urlExtra: user.id,
      });
      notify.addNotification("User Updated", NotificationType.SUCCESS);
      return payload;
    } catch (e) {
      notify.addNotification(
        `Error while updating user:${api.errors}`,
        NotificationType.SUCCESS
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
