/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { AiFillGithub } from "react-icons/ai"
import ReactMarkdown from "react-markdown"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import remarkGfm from "remark-gfm"

import { Button } from "../../components/Button"
import { ColoredTag } from "../../components/ColoredTag"
import { ExtLink } from "../../components/ExtLink"
import { IssuesList } from "../../components/IssuesList"
import { Section } from "../../components/Layout"
import { ProjectBox } from "../../components/ProjectBox"
import { ProjectLinks } from "../../components/ProjectLinks"
import {
  H1,
  H2,
  LargeParagraph,
  Mark,
  Paragraph,
} from "../../components/Typography"
import { ProjectListings } from "../../interfaces/ProjectListings"
import { theme } from "../../theme"
import { getIssuesWithProjectInfo } from "../../utils/getAllIssues"
import { getIssueWithProject } from "../../utils/getIssueWithProject"
import { getProjectLink } from "../../utils/getProjectLink"

export const IssueDetail = ({ data }: { data: ProjectListings }) => {
  const {
    owner: projectOwner,
    project: projectRepo,
    issue: issueNumber,
  } = useParams<{ owner: string; project: string; issue: string }>()

  const issue = getIssueWithProject(
    data,
    projectOwner!,
    projectRepo!,
    Number(issueNumber)
  )
  const projectIssues = getIssuesWithProjectInfo(data, {
    owner: projectOwner,
    repo: projectRepo,
    omitIssueNumber: issue?.number,
  })

  if (!issue) {
    return (
      <h1>
        Poptávka {projectOwner}/{projectRepo}/{issueNumber} zde není.
      </h1>
    )
  }

  return (
    <div
      css={css`
        @media (min-width: 850px) {
          display: grid;
          grid-template-columns: 1fr 300px;
          column-gap: 36px;
        }
      `}
    >
      <Section
        css={css`
          grid-column: 1 / span 2;
        `}
      >
        <Mark>Poptávka:</Mark>
        <H1>
          {issue.title}&nbsp;
          <span
            css={css`
              color: ${theme.colors.gray};
              font-weight: normal;
            `}
          >
            #{issue.number}
          </span>
        </H1>
        <div
          css={css`
            margin-top: -16px;
          `}
        >
          {issue.link && (
            <ExtLink href={issue.link}>
              <AiFillGithub size={20} />
              &nbsp;GitHub
            </ExtLink>
          )}
        </div>
        <div
          css={css`
            max-width: 750px;
          `}
        >
          <LargeParagraph>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {issue.description}
            </ReactMarkdown>
          </LargeParagraph>
        </div>
        {issue.project.maintainers[0].email !== undefined && (
          <>
            <Mark>Zaujala tě poptávka?</Mark>
            <Button href={`mailto:${issue.project.maintainers[0].email}`}>
              Napiš nám
            </Button>
          </>
        )}
      </Section>
      <Section
        css={css`
          max-width: 600px;
          grid-column: 1 / 1;
        `}
      >
        <ProjectBox>
          <Mark>Projekt:</Mark>
          <H2>
            <Link to={getProjectLink(issue.project)}>{issue.project.name}</Link>
          </H2>
          <Paragraph>{issue.project["short-description"]}</Paragraph>
          <Paragraph>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {issue.project.description}
            </ReactMarkdown>
          </Paragraph>
          {issue.project.tags?.map((tag) => (
            <ColoredTag key={tag} isLight>
              {tag}
            </ColoredTag>
          ))}
        </ProjectBox>
      </Section>
      <Section
        css={css`
          max-width: 500px;
          grid-column: 2 / 2;
          @media (min-width: 850px) {
            border: none;
          }
        `}
      >
        <ProjectLinks projectInfo={issue.project} />
      </Section>
      {!!projectIssues.length && (
        <Section
          css={css`
            max-width: 450px;
            grid-column: 1 / 1;
          `}
        >
          <Mark>Další poptávky projektu:</Mark>
          <IssuesList issues={projectIssues} project={issue.project} />
        </Section>
      )}
    </div>
  )
}
