import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import { fetchGithubIssueById, GithubIssue } from "./../services";
import { formatDate } from "./../utils";
import BackNav from "./BackNav";
import Spinner from "./Spinner";
import Text, { TextSizes } from "./Text";

interface Item {
  id: string;
  title: string;
  body: string;
}

interface IssueDetailsProps {
  items?: Item[];
}

const StyledWrapper = styled.div`
  border: 1px solid #d0d7de;
  border-radius: ${(props) => props.theme.sizes.small};
  font-size: 14px;
  position: relative;
  margin-bottom: 16px;
`;

const StyledHeader = styled.div`
  background-color: #f6f8fa;
  padding: 16px;
  border-bottom: 1px solid #d0d7de;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
`;

const StyledBody = styled.div`
  padding: 16px;
`;

const ELEMENT_ID_PREFIX = "issue-detail";

const IssueDetails: React.FC<IssueDetailsProps> = () => {
  const { id } = useParams();
  const [issueData, setIssueData] = useState<GithubIssue>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchGithubIssueById(id!).then((issue) => {
      if (!issue) {
        return;
      }
      setIsLoading(false);
      setIssueData(issue);
    });
  }, [id]);

  function renderIssue() {
    return (
      <>
        {!issueData ? (
          <Text element="p" textSize={TextSizes.Large} isBold isCentered>
            No data to load
          </Text>
        ) : (
          <>
            <BackNav id="back-to-issues" text="Back to issues" />
            <StyledWrapper id={`${ELEMENT_ID_PREFIX}-wrapper`}>
              <StyledHeader id={`${ELEMENT_ID_PREFIX}-header`}>
                Created by <strong>{issueData.author.login}</strong> on{" "}
                {formatDate(issueData.createdAt)}
              </StyledHeader>
              <StyledBody id={`${ELEMENT_ID_PREFIX}-body`}>
                <h2>{issueData.title}</h2>
                <ReactMarkdown>{issueData.body}</ReactMarkdown>
              </StyledBody>
            </StyledWrapper>
          </>
        )}
      </>
    );
  }

  function renderComments() {
    return issueData?.comments.map((comment, index) => (
      <StyledWrapper key={`${issueData.id}-${index}`}>
        <StyledHeader>
          Commented by <strong>{comment.author.login}</strong> on{" "}
          {formatDate(comment.createdAt)}
        </StyledHeader>
        <StyledBody>
          <ReactMarkdown>{comment.body}</ReactMarkdown>
        </StyledBody>
      </StyledWrapper>
    ));
  }

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {renderIssue()}
          {renderComments()}
        </>
      )}
    </>
  );
};

export default IssueDetails;
