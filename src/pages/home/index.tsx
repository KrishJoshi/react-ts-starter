import React from "react";
import Loading from "../../common/components/Loading";
import UsersTable from "./components/UsersTable";
import useFetchUsers from "./hooks/useFetchUsers";
import useDeleteUsers from "./hooks/useDeleteUser";
import styled from "styled-components";
import { Link } from "react-router-dom";

const AddButton = styled(Link)`
  position: absolute;
  top: 1vh;
  color: #000;
  background: #fff;
  border-radius: 1rem;
  padding: 1rem;
`;

const Home = () => {
  const { loading, users } = useFetchUsers();
  const useDelete = useDeleteUsers();
  if (loading || useDelete.removing) return <Loading />;
  else
    return (
      <>
        <AddButton to="/users/create">Add User</AddButton>
        <UsersTable users={users} onDelete={useDelete.remove} />
      </>
    );
};

export default Home;
