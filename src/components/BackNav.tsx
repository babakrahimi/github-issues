import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Chevron from "./../assets/images/chevron.svg";

export interface BackButtonProps {
  id: string;
  text: string;
}

const StyledButton = styled.button`
  background: transparent no-repeat url(${Chevron}) 0 50%;
  border: 0 none;
  display: inline-block;
  padding: 0 0 0 24px;
  font-size: 14px;
  font-weight: bold;
  margin: 24px 0;
  cursor: pointer;
`;

export const BackButton: React.FC<BackButtonProps> = ({ id, text }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <StyledButton id={id} onClick={handleGoBack}>
      {text}
    </StyledButton>
  );
};

export default BackButton;
