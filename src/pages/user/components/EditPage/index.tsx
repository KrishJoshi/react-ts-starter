import React from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import useFetchUser from "../../hooks/useFetchUser";
import useEditUser from "../../hooks/useEditUser";
import EditUserForm from "../EditUserForm";
import Loading from "../../../../common/components/Loading";

const BackLink = styled(Link)`
  padding: 1rem;
  text-align: left;
`;

const EditPage = () => {
  let { id } = useParams();
  const { loading, user } = useFetchUser(id);
  const { save, saving } = useEditUser();
  if (loading || typeof user === "undefined") return <Loading />;
  else
    return (
      <>
        <BackLink to="/">{"< Back"}</BackLink>
        <EditUserForm user={user} saving={saving} onSubmit={save} />
      </>
    );
};

export default EditPage;
