/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import type React from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import remarkGfm from "remark-gfm";

import type { Project } from "../interfaces/Project";
import type { ProjectInfo } from "../interfaces/ProjectInfo";
import type { ProjectIssue } from "../interfaces/ProjectIssue";
import type { ProjectListing } from "../interfaces/ProjectListing";
import { theme } from "../theme";
import { getIssueLink } from "../utils/getIssueLink";
import { H3 } from "./Typography";

export const IssuesList = ({
  issues,
  project,
}: {
  readonly issues: Array<ProjectIssue>;
  readonly project: ProjectListing | (Project & ProjectInfo);
}): React.JSX.Element => (
  <>
    {issues.map((issue) => (
      <article
        css={css`
          margin: 12px 0 24px;
          img {
            max-width: 100%;
          }
        `}
        key={issue.number}
      >
        <H3>
          <Link
            to={getIssueLink({
              project: {
                ...("info" in project
                  ? { ...project, ...project.info }
                  : { ...project }),
              },
              ...issue,
            })}
          >
            {issue.title}
          </Link>
          &nbsp;
          <span
            css={css`
              color: ${theme.colors.gray};
              font-weight: normal;
            `}
          >
            #{issue.number}
          </span>
        </H3>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {issue.description}
        </ReactMarkdown>
      </article>
    ))}
  </>
);
