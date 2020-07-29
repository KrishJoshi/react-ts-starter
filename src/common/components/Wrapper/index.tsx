import styled from "styled-components";

export const Container = styled.div`
  margin: 0;
  display: grid;
  grid-template-rows: 100vh;
  grid-template-columns: 100vw;
  background: linear-gradient(45deg, #4158d0, #c850c0);
`;

export const Page = styled.div`
  justify-self: center;
  align-self: center;
  text-align: center;
  border-radius: 10px;
  background: #fff;
  overflow: hidden;
  min-height: 20vh;
  min-width: 20vw;
  animation: ease-in-out all 1s;
`;
