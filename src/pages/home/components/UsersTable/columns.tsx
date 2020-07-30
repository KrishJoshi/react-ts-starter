import React from "react";
import { Column } from "react-table";
import styled from "styled-components";
import { Link } from "react-router-dom";

const RemoveButton = styled.button`
  background: #fff;
  border: none;
`;

const columns: (onDelete: (id: number) => void) => Array<Column<User>> = (
  onDelete
) => [
  {
    Header: "First Name",
    accessor: "first_name",
  },
  {
    Header: "Last Name",
    accessor: "last_name",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "",
    accessor: "id",
    id: "" + new Date(),
    Cell: ({ value }) => <Link to={`/users/${value}`}>Edit</Link>,
  },
  {
    Header: "",
    accessor: "id",
    Cell: ({ value }) => (
      <RemoveButton onClick={() => onDelete(value)}>Remove</RemoveButton>
    ),
  },
];

export default columns;
