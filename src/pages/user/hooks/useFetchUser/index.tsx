import { useEffect, useState } from "react";
import { useGet } from "../../../../common/hooks/useApi";
import { USERS } from "../../../../common/urls";
import { NotificationType } from "../../../../common/providers/notifications";
import useNotifications from "../../../../common/hooks/useNotifications";

const useFetchUser = (id: number) => {
  const [user, setUser] = useState<User>();
  const api = useGet<FetchUser>(USERS + id);
  const notify = useNotifications();

  useEffect(() => {
    fetch();
  }, []);

  async function fetch() {
    try {
      const { payload } = await api.get();
      setUser(payload.data);
    } catch (e) {
      notify.addNotification(
        `Error while getting user`,
        NotificationType.ERROR
      );
      api.reset();
    }
  }
  return {
    fetch,
    loading: api.loading,
    user,
  };
};
export default useFetchUser;
