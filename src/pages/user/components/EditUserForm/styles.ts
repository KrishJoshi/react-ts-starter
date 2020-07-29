import styled from "styled-components";

export const Form = styled.form`
  padding: 0 1vw;
`;

export const FormGroup = styled.div`
  display: block;
  width: 300px;
  margin: 2vh auto;
`;

export const Label = styled.label`
  margin-bottom: 0.5em;
  text-align: left;
  display: block;
`;

export const Input = styled.input`
  padding: 0.5em;
  border: none;
  border-radius: 3px;
  width: 100%;
  margin-bottom: 0.5em;
`;

export const FormError = styled.div`
  color: red;
  margin-top: 0;
`;

export const Submit = styled.button`
  margin: 1vh 0;
  border-radius: 1rem;
  padding: 1vh;
  border: 0;
  font-size: 1rem;
  cursor: pointer;
  :hover {
    border: 1px solid rgba(65, 88, 208, 0.7);
  }
`;
