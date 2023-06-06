import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import speech from "./../../assets/images/speech.svg";
import closed from "./../../assets/images/closed.svg";
import open from "./../../assets/images/open.svg";
import { media } from "../../theme/mixins";
import { formatDate } from "../../utils";
import Text, { TextColors, TextSizes } from "../Text";

interface Author {
  login: string;
}

export interface CardProps {
  id: string;
  title: string;
  author: Author;
  createdAt: string;
  link: string;
  children?: React.ReactNode;
  totalComments?: number;
  body?: string;
  isClosed?: boolean;
}

const StyledCard = styled.div`
  display: flex;
  align-items: flex-start;
  font-size: 12px;
  border-bottom: 1px solid rgba(224, 224, 224, 1);
  padding: 10px 15px;
  background-color: #fff;
  gap: 10px;
  &:last-of-type {
    border-bottom: 0;
  }
  a {
    color: rgb(0, 0, 0);
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const StyledCardBody = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  /* ${media.desktop`
    
  `} */
`;

const StyledCardTitleWrap = styled.div`
  a {
    display: inline-block;
  }
`;

const StyledCardTitle = styled.h2`
  margin: 0 0 8px;
  font-size: 16px;
`;

const StyledSpeech = styled.div`
  color: #666;
  display: flex;
  align-items: center;
  font-weight: bold;
  gap: 4px;
`;

const IconCommonStyles = css`
  background-repeat: "none";
  background-position: 50% 50%;
  display: inline-block;
  width: 16px;
  height: 16px;
`;

const SpeechIcon = styled.i`
  background-image: url(${speech});
  ${IconCommonStyles}
`;

const ClosedIcon = styled.i`
  background-image: url(${closed});
  ${IconCommonStyles}
`;

const OpenIcon = styled.i`
  background-image: url(${open});
  ${IconCommonStyles}
`;

export const Card: React.FC<CardProps> = ({
  id,
  link,
  title,
  author,
  isClosed,
  children,
  createdAt,
  totalComments,
  ...props
}) => {
  return (
    <StyledCard id={id} className="card" {...props}>
      {isClosed ? (
        <ClosedIcon aria-label="Closed icon" />
      ) : (
        <OpenIcon aria-label="Open icon" />
      )}
      <StyledCardBody>
        <StyledCardTitleWrap>
          <Link to={link}>
            <StyledCardTitle className="card-title">{title}</StyledCardTitle>
          </Link>
          <div>
            <Text element="span" textSize={TextSizes.Small}>
              by {author.login} was created on{" "}
              <time dateTime={formatDate(createdAt)}>
                {formatDate(createdAt)}
              </time>
            </Text>
          </div>
        </StyledCardTitleWrap>
        {children}
      </StyledCardBody>
      {!!totalComments && (
        <StyledSpeech>
          <SpeechIcon />
          <Text
            element="span"
            textSize={TextSizes.Small}
            textColor={TextColors.Gray}
          >
            {totalComments}
          </Text>
        </StyledSpeech>
      )}
    </StyledCard>
  );
};

export default Card;
