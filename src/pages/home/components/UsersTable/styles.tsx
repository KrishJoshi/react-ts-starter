import styled from "styled-components";

export const Table = styled.table`
  border-collapse: collapse;
  background: white;
  overflow: hidden;
  width: 90vw;
  margin: 0 auto;
  position: relative;

  * {
    position: relative;
  }
  td,
  th {
    padding-left: 8px;
  }
  thead tr {
    height: 60px;
    background: #36304a;
  }
  tbody tr {
    height: 50px;
  }
  tbody tr:last-child {
    border: 0;
  }
  td,
  th {
    text-align: left;
  }

  th {
    font-size: 18px;
    color: #fff;
    line-height: 1.2;
    font-weight: unset;
  }

  tbody tr:nth-child(even) {
    background-color: #f5f5f5;
  }

  tbody tr {
    font-size: 15px;
    color: #808080;
    line-height: 1.2;
    font-weight: unset;
  }

  tbody tr:hover {
    color: #555555;
    background-color: #f5f5f5;
    cursor: pointer;
  }

  @media screen and (max-width: 992px) {
     {
      display: block;
      height: 80vh;
      overflow: scroll;
    }
    > *,
    tr,
    td,
    th {
      display: block;
    }
    thead {
      display: none;
    }
    tbody tr {
      height: auto;
      padding: 37px 0;
    }
    tbody tr td {
      padding-left: 40% !important;
      margin-bottom: 24px;
    }
    tbody tr td:last-child {
      margin-bottom: 0;
    }
    tbody tr td:before {
      font-size: 14px;
      color: #999999;
      line-height: 1.2;
      font-weight: unset;
      position: absolute;
      width: 40%;
      left: 30px;
      top: 0;
    }
    tbody tr td:nth-child(1):before {
      content: "First Name";
    }
    tbody tr td:nth-child(2):before {
      content: "Last Name";
    }
    tbody tr td:nth-child(3):before {
      content: "Email";
    }
    tbody tr {
      font-size: 14px;
    }
  }
`;
