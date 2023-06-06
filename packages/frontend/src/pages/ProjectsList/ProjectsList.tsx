import { Project } from "../../components/Project"
import { ProjectListings } from "../../interfaces/ProjectListings"

export const ProjectsList = ({ data }: { data: ProjectListings }) => (
  <>
    {data.projects.map((project) => (
      <Project key={`${project.owner}/${project.repo}`} project={project} />
    ))}
  </>
)
