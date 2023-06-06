import { getData } from "./utils";

interface Author {
  login: string;
}

export interface Comment {
  id: string;
  author: Author;
  body: string;
  createdAt: string;
}

export type IssueState = "OPEN" | "CLOSED";

export interface GithubIssue {
  id: string;
  title: string;
  body: string;
  author: Author;
  createdAt: string;
  comments: Comment[];
  state: IssueState;
  totalComments: number;
}

export async function fetchGithubIssues(
  term: string = "",
  state: IssueState = "OPEN"
): Promise<GithubIssue[]> {
  return (
    (await getData<GithubIssue[]>(`/issues?term=${term}&state=${state}`)) ?? []
  );
}

export async function fetchGithubIssueById(
  id: string
): Promise<GithubIssue | null> {
  return await getData<GithubIssue>(`/issues/${id}`);
}
