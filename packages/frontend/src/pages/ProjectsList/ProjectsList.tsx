import { testData } from "../../testData"
import { Project } from "../../components/Project"

export const ProjectsList: React.FC = () => <>{testData.projects.map(project =>  <Project project={project} />)}</>