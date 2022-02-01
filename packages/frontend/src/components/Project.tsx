import React from "react"
import { ArticleBox } from "./ArticleBox"
import { getProjectLink } from "../utils/getProjectLink"
import { ProjectListing } from "../interfaces/ProjectListing"

export const Project: React.FC<{ project: ProjectListing }> = ({ project }) => (
  <ArticleBox
    title={project.info.name}
    link={getProjectLink(project)}
    description={project.info.description}
    tags={project.info.tags}
  />
)
