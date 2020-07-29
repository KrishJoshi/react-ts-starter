import { useEffect, useState } from "react";
import { useGet } from "../../../../common/hooks/useApi";
import { USERS } from "../../../../common/urls";

interface FetchUsers {
  data: Users;
}

const useFetchUsers = () => {
  const [users, setUsers] = useState<Users>([]);
  const api = useGet<FetchUsers>(USERS);

  useEffect(() => {
    fetch();
  }, []);

  async function fetch() {
    try {
      const { payload } = await api.get();
      setUsers(payload.data);
    } catch (e) {}
  }

  return {
    loading: api.loading,
    users,
  };
};
export default useFetchUsers;
