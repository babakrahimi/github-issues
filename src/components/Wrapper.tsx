import React from "react";
import styled from "styled-components";

export interface WrapperProps {
  id: string;
}

const Wrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 62px;
  padding-bottom: 50px;
  max-width: 1280px;
  margin: 0 auto;
`;

export const Card: React.FC<WrapperProps> = ({ id, ...props }) => {
  return <Wrapper id={id} {...props}></Wrapper>;
};

export default Wrapper;
