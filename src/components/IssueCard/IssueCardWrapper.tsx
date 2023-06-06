import React from "react";
import styled from "styled-components";

export interface CardWrapperProps {
  id: string;
  children?: any;
}

const StyledCardWrapper = styled.div`
  border: 1px solid rgba(224, 224, 224, 1);
  border-radius: ${(props) => props.theme.sizes.small};
  overflow: hidden;
`;

export const CardWrapper: React.FC<CardWrapperProps> = ({
  id,
  children,
  ...props
}) => {
  return (
    <StyledCardWrapper id={id} {...props}>
      {children}
    </StyledCardWrapper>
  );
};

export default CardWrapper;
