/** @jsxImportSource @emotion/react */
import React from "react"
import { useParams } from "react-router"
import { H1, LargeParagraph, Mark } from "../../components/Typography"
import { ColoredTag } from "../../components/ColoredTag"
import { getProject } from "../../utils/getProject"
import { css } from "@emotion/react"
import ReactMarkdown from "react-markdown"
import { ProjectListings } from "../../interfaces/ProjectListings"
import { ProjectLinks } from "../../components/ProjectLinks"
import { IssuesList } from "../../components/IssuesList"
import { ProjectBox } from "../../components/ProjectBox"
import { Section } from "../../components/Layout"
import remarkGfm from "remark-gfm"

export const ProjectDetail: React.FC<{ data: ProjectListings }> = ({
  data,
}) => {
  const { owner: projectOwner, project: projectRepo } = useParams<{
    owner: string
    project: string
    issue: string
  }>()
  const project = getProject(data, projectOwner!, projectRepo!)

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
        <ProjectBox>
          <H1
            css={css`
              color: white;
            `}
          >
            {project.info.name}
          </H1>
          <div
            css={css`
              max-width: 750px;
            `}
          >
            <LargeParagraph>{project.info["short-description"]}</LargeParagraph>
            <LargeParagraph>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {project.info.description}
              </ReactMarkdown>
            </LargeParagraph>
            {project.info.tags?.map((tag) => (
              <ColoredTag key={tag} isLight>
                {tag}
              </ColoredTag>
            ))}
          </div>
        </ProjectBox>
      </Section>
      <Section
        css={css`
          max-width: 500px;
          grid-column: 2 / 2;
        `}
      >
        <ProjectLinks projectInfo={project.info} />
      </Section>
      {!!project.issues.length && (
        <Section
          css={css`
            grid-column: 1 / 1;
            grid-row: 2 / 2;
          `}
        >
          <Mark>Poptávky u projektu:</Mark>
          <IssuesList issues={project.issues} project={project} />
        </Section>
      )}
    </div>
  )
}
