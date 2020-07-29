import styled from "styled-components";

export const NotificationMessage = styled.div`
  border: 1px #fff solid;
  background: linear-gradient(45deg, #4158d0, #c850c0);
  position: fixed;
  top: 1vh;
  right: 2vh;
  border-radius: 1rem;
  padding: 1rem;
  color: #fff;
`;

export const DismissNotification = styled.button`
  position: absolute;
  top: -10px;
  background: #fff;
  border: none;
  border-radius: 100%;
  height: 1.5rem;
  width: 1.5rem;
  opacity: 0.9;
  animation: all 1s ease-in-out;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;
