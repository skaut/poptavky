import { ArticleBox } from "./ArticleBox"
import { getProjectLink } from "../utils/getProjectLink"
import { ProjectListing } from "../interfaces/ProjectListing"

export const Project = ({ project }: { project: ProjectListing }) => (
  <ArticleBox
    title={project.info.name}
    link={getProjectLink(project)}
    description={project.info.description}
    tags={project.info.tags}
  />
)
