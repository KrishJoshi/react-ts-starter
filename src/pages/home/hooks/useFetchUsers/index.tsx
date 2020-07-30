import { useEffect, useState } from "react";
import { useGet } from "../../../../common/hooks/useApi";
import { USERS } from "../../../../common/urls";
import { NotificationType } from "../../../../common/providers/notifications";
import useNotifications from "../../../../common/hooks/useNotifications";

interface FetchUsers {
  data: Users;
}

const useFetchUsers = () => {
  const [users, setUsers] = useState<Users>([]);
  const api = useGet<FetchUsers>(USERS);
  const notify = useNotifications();

  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetch() {
    try {
      const { payload } = await api.get();
      setUsers(payload.data);
    } catch (e) {
      notify.addNotification(
        "Unable to fetch all users",
        NotificationType.ERROR
      );
      api.reset();
    }
  }

  return {
    fetch,
    loading: api.loading,
    users,
  };
};
export default useFetchUsers;
