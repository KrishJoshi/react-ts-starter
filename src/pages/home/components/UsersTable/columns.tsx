import React from "react";
import { Column } from "react-table";

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
    Cell: ({ value }) => <a href={`/users/${value}`}>Edit</a>,
  },
  {
    Header: "",
    accessor: "id",
    Cell: ({ value }) => (
      <a href="" onClick={() => onDelete(value)}>
        Remove
      </a>
    ),
  },
];

export default columns;
