import React, { useState } from "react";
import styled from "styled-components";
import Input from "./Input";
import search from "./../assets/images/search.svg";

export interface IssueSearchProps {
  id: string;
  onSearch: (term: string) => void;
}

const StyledSearch = styled.div`
  margin-bottom: 16px;
`;

export const IssueSearch: React.FC<IssueSearchProps> = ({
  onSearch,
  ...props
}) => {
  const [value, setValue] = useState("");

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      onSearch(value);
    }
  }

  function handleChange(newValue: string) {
    setValue(newValue);
  }

  return (
    <StyledSearch {...props}>
      <Input
        icon={search}
        id="search"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        label="Search"
      />
    </StyledSearch>
  );
};

export default IssueSearch;
