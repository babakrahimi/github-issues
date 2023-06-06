import React from "react";
import styled, { css } from "styled-components";
import { ReactComponent as Closed } from "./../../assets/images/closed.svg";
import { ReactComponent as Open } from "./../../assets/images/open.svg";

export interface CardHeaderProps {
  id: string;
  activeState: IssueStates;
}

const StyledCardHeader = styled.div`
  background-color: #f6f8fa;
  border-bottom: 1px solid #d0d7de;
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: bold;
`;

const StyledLink = styled.a<{ isActive: boolean }>`
  /* color: ${(props) =>
    props.isActive ? props.theme.colors.primary : "#999"}; */
  color: ${({ isActive }) => (isActive ? "#1f2328" : "#999")};
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  padding: 0;
  cursor: pointer;
  svg {
    path {
      fill: ${({ isActive }) => (isActive ? "#1f2328" : "#999")};
    }
  }
`;

const IconCommonStyles = css`
  width: 16px;
  height: 16px;
`;

const ClosedIcon = styled(Closed)`
  ${IconCommonStyles}
`;

const OpenIcon = styled(Open)`
  ${IconCommonStyles}
`;

export type IssueStates = "#open" | "#closed";

export const CardHeader: React.FC<CardHeaderProps> = ({
  id,
  activeState,
  ...props
}) => {
  return (
    <StyledCardHeader id={id} {...props}>
      <StyledLink
        id={`${id}__link--open`}
        href="#open"
        isActive={activeState === "#open"}
      >
        <OpenIcon /> Open
      </StyledLink>
      <StyledLink
        id={`${id}__link--closed`}
        href="#closed"
        isActive={activeState === "#closed"}
      >
        <ClosedIcon /> Closed
      </StyledLink>
    </StyledCardHeader>
  );
};

export default CardHeader;
