import React from 'react';
import { Column } from 'react-table';

const columns: Array<Column<User>> = [
  {
    Header: 'First Name',
    accessor: 'first_name',
  },
  {
    Header: 'Last Name',
    accessor: 'last_name',
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
  {
    Header: '',
    accessor: 'id',
    Cell: ({ value }) => <a href={`/users/${value}`}>Edit</a>
  },
];

export default columns;