import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchGithubIssues, GithubIssue } from "./../services";
import IssueCard from "./IssueCard/IssueCard";
import Text, { TextSizes } from "./Text";
import IssueSearch from "./IssueSearch";
import IssueCardWrapper from "./IssueCard/IssueCardWrapper";
import IssueCardHeader, { IssueStates } from "./IssueCard/IssueCardHeader";
import Pagination from "./Pagination";

function getStateName(state: IssueStates) {
  return state === "#open" ? "OPEN" : "CLOSED";
}

function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 9;

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const [issuesData, setIssuesData] = useState<GithubIssue[]>([]);

  const location = useLocation();
  const lowerHash = location.hash.toLowerCase();
  const activeState =
    lowerHash === "#open" || lowerHash === "#closed" ? lowerHash : "#open";

  useEffect(() => {
    fetchGithubIssues("", getStateName(activeState)).then(setIssuesData);
  }, [location.hash, activeState]);

  const handleSearch = (term: string) => {
    fetchGithubIssues(term).then(setIssuesData);
  };

  function renderIssues() {
    return issuesData.map((issue) => (
      <IssueCard
        id={`card-${issue.id}`}
        link={`issue/${issue.id}`}
        key={issue.id}
        title={issue.title}
        author={issue.author}
        createdAt={issue.createdAt}
        totalComments={issue.totalComments}
        isClosed={issue.state === "CLOSED"}
      />
    ));
  }

  return (
    <>
      <Text id="home-page__title" element="p" textSize={TextSizes.Large} isBold>
        Issues
      </Text>
      <IssueSearch id="search-box" onSearch={handleSearch} />

      <IssueCardWrapper id="issues-wrapper">
        <IssueCardHeader id="issues-header" activeState={activeState} />
        {renderIssues()}
      </IssueCardWrapper>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default Home;
