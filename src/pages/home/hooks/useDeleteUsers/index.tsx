import { useDelete } from "../../../../common/hooks/useApi";
import { USERS } from "../../../../common/urls";
import { NotificationType } from "../../../../common/providers/notifications";
import useNotifications from "../../../../common/hooks/useNotifications";

interface FetchUsers {
  data: Users;
}

const useDeleteUsers = () => {
  const api = useDelete<FetchUsers>(USERS);
  const notify = useNotifications();
  async function remove(id: number) {
    try {
      await api.delete({ urlExtra: id });
      notify.addNotification("User removed", NotificationType.SUCCESS);
    } catch (e) {
      notify.addNotification("User unable to remove", NotificationType.ERROR);
      api.reset();
    }
  }

  return {
    loading: api.loading,
    remove,
  };
};
export default useDeleteUsers;
