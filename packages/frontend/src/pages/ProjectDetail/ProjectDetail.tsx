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
import { H1, Paragraph, Mark, H3 } from "../../components/Typography"
import { ExtLink } from "../../components/ExtLink"
import { ProjectInfoLink } from "../../interfaces/ProjectInfo"
import styled from "@emotion/styled"
import { Link } from "react-router-dom"
import { ColoredTag } from "../../components/ColoredTag"
import { getProject } from "../../utils/getProject"
import { getIssueLink } from "../../utils/getIssueLink"
import { css } from "@emotion/react"
import { theme } from "../../theme"
import ReactMarkdown from "react-markdown"
import { ProjectListings } from "../../interfaces/ProjectListings"

export const ProjectDetail: React.FC<{ data: ProjectListings }> = ({
  data,
}) => {
  const { owner: projectOwner, project: projectRepo } =
    useParams<{ owner: string; project: string; issue: string }>()
  const project = getProject(data, projectOwner, projectRepo)

  if (!project) {
    return (
      <h1>
        Projekt {projectOwner}/{projectRepo} zde není.
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
        <H1>{project.info.name}</H1>
        <div
          css={css`
            max-width: 750px;
          `}
        >
          <LargeParagraph>
            <ReactMarkdown>{project.info["short-description"]}</ReactMarkdown>
          </LargeParagraph>
          <LargeParagraph>
            <ReactMarkdown>{project.info.description}</ReactMarkdown>
          </LargeParagraph>
          {project.info.tags?.map((tag) => (
            <ColoredTag>{tag}</ColoredTag>
          ))}
        </div>
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
        <Paragraph>
          <Mark>
            <BsFillPersonFill />
            &nbsp;
            {project.info.maintainers.length > 1 ? "Správci:" : "Správce:"}
          </Mark>
          {project.info.maintainers.map((person) => (
            <SmallLink>
              <ExtLink href={`mailto:${person.email}`}>{person.name}</ExtLink>
            </SmallLink>
          ))}
        </Paragraph>
        {links.map((link) => {
          const currentLink = project.info.links.find(
            (item) => item.type === link.type
          )
          if (!currentLink) {
            return undefined
          }
          const url = new URL(currentLink.uri)
          return (
            <>
              <Paragraph>
                <Mark>
                  {link.icon}&nbsp;{link.label}:
                </Mark>
                <SmallLink key={link.type}>
                  <ExtLink href={currentLink.uri}>
                    {`${url.host}${url.pathname}`}
                  </ExtLink>
                </SmallLink>
              </Paragraph>
            </>
          )
        })}
      </Section>
      {!!project.issues.length && (
        <Section
          css={css`
            max-width: 450px;
            grid-column: 1 / 1;
            grid-row: 2 / 2;
          `}
        >
          <Mark>Poptávky u projektu:</Mark>
          {project.issues.map((issue) => (
            <article
              css={css`
                margin: 12px 0 24px;
              `}
            >
              <H3>
                {issue.link ? (
                  <Link
                    to={getIssueLink({
                      project: { ...project, ...project.info },
                      ...issue,
                    })}
                  >
                    {issue.title}
                  </Link>
                ) : (
                  issue.title
                )}
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
              {issue.description}
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
  label: string
  icon?: ReactNode
}

const links: LinkType[] = [
  {
    type: "email",
    label: "E-mail",
    icon: <GrMail />,
  },
  {
    type: "demo",
    label: "Demo",
    icon: <MdWebAsset />,
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
  },
]
