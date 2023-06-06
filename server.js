const cors = require("cors");
const express = require("express");
const fetch = require("node-fetch");

const app = express();
const port = 3002;

const GITHUB_API_URL = "https://api.github.com/graphql";
const GITHUB_ACCESS_TOKEN = "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";

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

const searchIssuesQuery = `
  query ($searchQuery: String!, $first: Int) {
    search(query: $searchQuery, type: ISSUE, first: $first) {
      edges {
        node {
          ... on Issue {
            id
            title
            body
            author {
              login
            }
            createdAt
            state
            comments {
              totalCount
            }
          }
        }
      }
    }
  }
`;

const allIssuesQuery = `
  query ($owner: String!, $name: String!, $states: [IssueState!], $first: Int) {
    repository(owner: $owner, name: $name) {
      issues(first: $first, states: $states, orderBy: { field: CREATED_AT, direction: DESC }) {
        edges {
          node {
            id
            title
            author {
              login
            }
            createdAt
            closedAt
            state
            comments {
              totalCount
            }
          }
        }
      }
    }
  }
`;

const getIssueByIdQuery = `
  query ($id: ID!, $commentsFirst: Int) {
    node(id: $id) {
      ... on Issue {
        id
        title
        body
        author {
          login
        }
        createdAt
        closedAt
        state
        url
        comments(first: $commentsFirst) {
          edges {
            node {
              id
              author {
                login
              }
              body
              createdAt
            }
          }
        }
      }
    }
  }
`;

app.get("/issues", (req, res) => {
  const term = req.query.term;
  const state = req.query.state;

  const result =
    typeof term === "string" && term.length
      ? searchIssues(term)
      : fetchAllIssues(state);

  result
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Something went wrong.");
    });
});

app.get("/issues/:id", (req, res) => {
  const variables = {
    id: req.params.id,
    commentsFirst: 10,
  };

  fetchGraphQL(getIssueByIdQuery, variables)
    .then((r) => {
      const node = r.data.node;
      res.json({ ...node, comments: node.comments.edges.map((c) => c.node) });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Something went wrong.");
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

async function fetchAllIssues(states) {
  const variables = {
    owner: "facebook",
    name: "react",
    first: 10,
    states,
  };

  const json = await fetchGraphQL(allIssuesQuery, variables);
  return json.data.repository.issues.edges.map((e) => ({
    ...e.node,
    totalComments: e.node.comments.totalCount,
  }));
}

async function searchIssues(term) {
  const variables = {
    searchQuery: `in:title,body ${term} repo:facebook/react is:issue`,
    first: 10,
  };

  const json = await fetchGraphQL(searchIssuesQuery, variables);
  return json.data.search.edges.map((e) => ({
    ...e.node,
    totalComments: e.node.comments.totalCount,
  }));
}

async function fetchGraphQL(query, variables = {}) {
  const response = await fetch(GITHUB_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(
      `Network error: ${response.status} - ${response.statusText}`
    );
  }

  return response.json();
}
