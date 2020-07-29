import React from "react";
import Loading from "../../common/components/Loading";
import UsersTable from "./components/UsersTable";
import useFetchUsers from "./hooks/useFetchUsers";
import useDeleteUsers from "./hooks/useDeleteUsers";

const Home = () => {
  const { loading, users } = useFetchUsers();
  const useDelete = useDeleteUsers();
  if (loading || useDelete.loading) return <Loading />;
  else return <UsersTable users={users} onDelete={useDelete.remove} />;
};

export default Home;
