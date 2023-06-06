import { ProjectListing } from "../interfaces/ProjectListing"
import { getProjectLink } from "../utils/getProjectLink"
import { ArticleBox } from "./ArticleBox"

export const Project = ({ project }: { project: ProjectListing }) => (
  <ArticleBox
    title={project.info.name}
    link={getProjectLink(project)}
    description={project.info.description}
    tags={project.info.tags}
  />
)
