/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import React from "react"
import ReactMarkdown from "react-markdown"
import { Link } from "react-router-dom"
import { theme } from "../theme"
import { getIssueLink } from "../utils/getIssueLink"
import { H3 } from "./Typography"
import { ProjectIssue } from "../interfaces/ProjectIssue"
import { ProjectListing } from "../interfaces/ProjectListing"
import { Project } from "../interfaces/Project"
import { ProjectInfo } from "../interfaces/ProjectInfo"

export const IssuesList: React.FC<{
  issues: ProjectIssue[]
  project: ProjectListing | (Project & ProjectInfo)
}> = ({ issues, project }) => (
  <>
    {issues.map((issue) => (
      <article
        key={issue.number}
        css={css`
          margin: 12px 0 24px;
        `}
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
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </article>
    ))}
  </>
)
