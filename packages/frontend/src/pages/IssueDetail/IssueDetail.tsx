/** @jsxImportSource @emotion/react */
import React, { ReactNode } from "react"
import { useParams } from "react-router"
import { AiFillGithub } from "react-icons/ai"
import { MdWebAsset } from "react-icons/md"
import { GrMail } from "react-icons/gr"
import { BiBookAlt } from "react-icons/bi"
import { FaSlack, FaFacebook } from "react-icons/fa"
import { MdChecklist } from "react-icons/md"
import { ImEarth } from "react-icons/im"
import { HiOutlineDocumentText } from "react-icons/hi"
import { BsFillPersonFill } from "react-icons/bs"
import { H1, H2, Paragraph, Mark, H3 } from "../../components/Typography"
import { ExtLink } from "../../components/Link"
import { testData } from "../../testData"
import { getIssueWithProject } from "../../utils/getIssueWithProject"
import { ProjectInfoLink } from "../../interfaces/ProjectInfo"
import styled from "@emotion/styled"
import { getProjectLink } from "../../utils/getProjectLink"
import { Link } from "react-router-dom"
import { ColoredTag } from "../../components/ColoredTag"
import { getIssuesWithProjectInfo } from "../../utils/getAllIssues"
import { getIssueLink } from "../../utils/getIssueLink"
import { css } from "@emotion/react"
import { theme } from "../../theme"
import ReactMarkdown from "react-markdown"
import TextTruncate from "react-text-truncate"
import { Button } from "../../components/Button"

export const IssueDetail: React.FC = () => {
  const { owner: projectOwner, project: projectRepo, issue: issueNumber } = useParams<{owner: string, project: string, issue: string}>()
  const issue = getIssueWithProject(testData, projectOwner, projectRepo, Number(issueNumber))
  const projectIssues = getIssuesWithProjectInfo(testData, {
    owner: projectOwner,
    repo: projectRepo,
    omitIssueNumber: issue?.number
  })

  if (!issue) {
    return <h1>Issue {projectOwner}/{projectRepo}/{issueNumber} zde není.</h1>
  }

  return (
    <div css={css`
      @media (min-width: 850px) {
        display: grid;
        grid-template-columns: 1fr 300px;
        column-gap: 36px;
      }
    `}>
      <Section css={css`grid-column: 1 / span 2`}>
        <Mark>Poptátvka:</Mark>
        <H1>{issue.title}&nbsp;<span css={css`color: ${theme.colors.gray}; font-weight: normal;`}>#{issue.number}</span></H1>
        <div css={css`margin-top: -16px`}>
          {issue.link && <ExtLink href={issue.link}><AiFillGithub size={20} />&nbsp;GitHub</ExtLink>}
        </div>
        <div css={css`max-width: 750px`}>
          <LargeParagraph><ReactMarkdown>{issue.description}</ReactMarkdown></LargeParagraph>
        </div>
        <Mark>Zaujala tě poptávka?</Mark>
        <Button href={`mailto:${issue.project.maintainers[0].email}`}>Napiš nám</Button>
      </Section>
      <Section css={css`max-width: 600px; grid-column: 1 / 1`}>
        <Mark>Projekt:</Mark>
        <H2><Link to={getProjectLink(issue.project)}>{issue.project.name}</Link></H2>
        <Paragraph>{issue.project["short-description"]}</Paragraph>
        <Paragraph><ReactMarkdown>{issue.project.description}</ReactMarkdown></Paragraph>
        {issue.project.tags?.map(tag => <ColoredTag>{tag}</ColoredTag>) }
      </Section>
      <Section css={css`
        max-width: 500px;
        grid-column: 2 / 2;
        @media (min-width: 850px) {
          border: none;
        }
      `}>
        <Paragraph>
          <Mark><BsFillPersonFill />&nbsp;{issue.project.maintainers.length > 1 ? "Správci:" : "Správce:"}</Mark>
          {issue.project.maintainers.map(person => <SmallLink><ExtLink href={`mailto:${person.email}`}>{person.name}</ExtLink></SmallLink>)}
        </Paragraph>
        {links.map(link => {
          const currentLink = issue.project.links.find(item => item.type === link.type)
          if (!currentLink) {
            return undefined
          }
          const url = new URL(currentLink.uri)
          return <>
            <Paragraph>
              <Mark>{link.icon}&nbsp;{link.label}:</Mark>
              <SmallLink key={link.type}>
                <ExtLink href={currentLink.uri}>
                {`${url.host}${url.pathname}`}
                </ExtLink>
              </SmallLink>
            </Paragraph>
          </>
        })}
      </Section>
      {!!projectIssues.length && (
        <Section css={css`max-width: 450px; grid-column: 1 / 1`}>
          <Mark>Další issues projektu:</Mark>
            {projectIssues.map(issue => (
              <article css={css`
                margin: 12px 0 24px;
              `}>
                <H3>{issue.link ? <Link to={getIssueLink(issue)}>{issue.title}</Link> : issue.title}&nbsp;<span css={css`color: ${theme.colors.gray}; font-weight: normal;`}>#{issue.number}</span></H3>
                <TextTruncate
                  line={3}
                  element="span"
                  truncateText="…"
                  text={issue.description}
                  textTruncateChild={<></>}
                />
              </article>
            ))}
        </Section>
      )}
    </div>
  )
}

const Section = styled("section")`
  margin: 0 0 16px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${theme.colors.brand}10;
`

const LargeParagraph = styled(Paragraph)`
  font-size: 18px;
  margin: 0;
`

const SmallLink = styled("span")`
  a {
    display: block;
    font-size: 0.9em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

  }
`

interface LinkType {
  type: ProjectInfoLink["type"]
  label: string,
  icon?: ReactNode
}

const links: LinkType[] = [
  {
    type: "email",
    label: "E-mail",
    icon: <GrMail />
  },
  {
    type: "demo",
    label: "Demo",
    icon: <MdWebAsset />
  },
  {
    type: "docs",
    label: "Dokumentace",
    icon: <HiOutlineDocumentText />,
  },
  {
    type: "facebook-group",
    label: "Skupina na facebooku",
    icon: <FaFacebook />,
  },
  {
    type: "facebook-page",
    label: "Stránka na facebooku",
    icon: <FaFacebook />,
  },
  {
    type: "github-repo",
    label: "Repozitář",
    icon: <AiFillGithub />,
  },
  {
    type: "homepage",
    label: "Web",
    icon: <ImEarth />,
  },
  {
    type: "issue-tracker",
    label: "Issue tracker",
    icon: <MdChecklist />,
  },
  {
    type: "slack",
    label: "Slack",
    icon: <FaSlack />,
  },
  {
    type: "wiki",
    label: "Wiki",
    icon: <BiBookAlt />,
  }
]