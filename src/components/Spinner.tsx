import React from "react";
import styled, { keyframes } from "styled-components";

export interface SpinnerProps {
  id?: string;
}

export const spinner = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const StyledSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100px;
  padding: 40px 0;
  &::after {
    display: inline-block;
    content: "";
    width: 50px;
    height: 50px;
    display: inline-block;
    padding: 0;
    border-radius: 100%;
    border: 5px solid;
    border-top-color: #000;
    border-bottom-color: #eee;
    border-left-color: #eee;
    border-right-color: #000;
    animation: ${spinner} 1s ease-in-out infinite;
  }
`;

export const Spinner: React.FC<SpinnerProps> = ({ id, ...rest }) => {
  return <StyledSpinner {...rest} id={`spinner-${id}`} />;
};

export default Spinner;
