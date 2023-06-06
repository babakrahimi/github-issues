import React from "react";
import styled from "styled-components";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button<{ isActive: boolean }>`
  background-color: ${(props) => (props.isActive ? "#eeeeee" : "#fff")};
  color: ${(props) => (props.isActive ? "#000" : "#666")};
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) =>
    props.isActive ? "rgba(224, 224, 224, 1)" : "rgba(224, 224, 224, 1)"};
  cursor: ${(props) => (props.isActive ? "default" : "pointer")};
  margin: 0 -1px;
  padding: 5px 10px;
  &:hover {
    background-color: #eee;
    color: #000;
  }
  &:last-of-type {
    border-top-right-radius: ${(props) => props.theme.sizes.small};
    border-bottom-right-radius: ${(props) => props.theme.sizes.small};
  }
  &:first-of-type {
    border-top-left-radius: ${(props) => props.theme.sizes.small};
    border-bottom-left-radius: ${(props) => props.theme.sizes.small};
  }
`;

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <PaginationContainer>
      {pageNumbers.map((pageNumber) => (
        <PageButton
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          isActive={currentPage === pageNumber}
        >
          {pageNumber}
        </PageButton>
      ))}
    </PaginationContainer>
  );
};

export default Pagination;
