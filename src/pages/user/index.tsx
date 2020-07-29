import React from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../../common/components/Loading";
import EditUserForm from "./components/EditUserForm";
import useFetchUser from "./hooks/useFetchUser";
import useEditUser from "./hooks/useEditUser";
import styled from "styled-components";

const BackLink = styled.div`
  padding: 1rem;
  text-align: left;
`;

const User = () => {
  let { id } = useParams();
  const { loading, user } = useFetchUser(id);
  const { save, saving } = useEditUser();
  if (loading || typeof user === "undefined") return <Loading />;
  else
    return (
      <div>
        <BackLink>
          <Link to="/">{"< Back"}</Link>
        </BackLink>
        <EditUserForm user={user} saving={saving} onSubmit={save} />
      </div>
    );
};

export default User;
