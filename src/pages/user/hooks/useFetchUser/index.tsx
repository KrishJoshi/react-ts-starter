import { useEffect, useState } from "react";
import { useGet } from "../../../../common/hooks/useApi";
import { USERS } from "../../../../common/urls";

const useFetchUser = (id: string) => {
  const [user, setUser] = useState<User>();
  const api = useGet<FetchUser>(USERS + id);

  useEffect(() => {
    fetch();
  }, []);

  async function fetch() {
    try {
      const { payload } = await api.get();
      setUser(payload.data);
    } catch (e) {}
  }
  return {
    loading: api.loading,
    user,
  };
};
export default useFetchUser;
