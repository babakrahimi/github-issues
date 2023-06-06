import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export interface NotFoundProps {
  id?: string;
}

const StyledButton = styled.button``;

export const NotFound: React.FC<NotFoundProps> = ({ id }) => {
  const navigate = useNavigate();

  return <StyledButton id={id}>Nothing here</StyledButton>;
};

export default NotFound;
