import type React from "react"

import { Project } from "../components/Project"
import type { ProjectListings } from "../interfaces/ProjectListings"

export const ProjectsList = ({
  data,
}: {
  data: ProjectListings
}): React.JSX.Element => (
  <>
    {data.projects.map((project) => (
      <Project key={`${project.owner}/${project.repo}`} project={project} />
    ))}
  </>
)
