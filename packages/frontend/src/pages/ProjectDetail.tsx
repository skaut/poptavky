/** @jsxImportSource @emotion/react */
import type React from "react";

import { css } from "@emotion/react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import remarkGfm from "remark-gfm";

import type { ProjectListings } from "../interfaces/ProjectListings";

import { ColoredTag } from "../components/ColoredTag";
import { IssuesList } from "../components/IssuesList";
import { Section } from "../components/Layout";
import { ProjectBox } from "../components/ProjectBox";
import { ProjectLinks } from "../components/ProjectLinks";
import { H1, LargeParagraph, Mark } from "../components/Typography";
import { getProject } from "../utils/getProject";

export const ProjectDetail = ({
  data,
}: {
  readonly data: ProjectListings;
}): React.JSX.Element => {
  const { owner: projectOwner, project: projectRepo } = useParams<{
    issue: string;
    owner: string;
    project: string;
  }>();
  const project = getProject(data, projectOwner, projectRepo);

  if (!project) {
    return (
      <h1>
        Projekt {projectOwner}/{projectRepo} zde není.
      </h1>
    );
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
              <ColoredTag isLight key={tag}>
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
  );
};
