import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import EditUserForm from "../EditUserForm";
import useCreateUser from "../../hooks/useCreateUser";

const BackLink = styled(Link)`
  padding: 1rem;
  text-align: left;
`;

const CreatePage = () => {
  const { save, saving } = useCreateUser();

  return (
    <>
      <BackLink to="/">{"< Back"}</BackLink>
      <EditUserForm saving={saving} onSubmit={save} />
    </>
  );
};

export default CreatePage;
