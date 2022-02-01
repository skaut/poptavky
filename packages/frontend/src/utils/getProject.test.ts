import { testData } from "../testData"
import { getProject } from "./getProject"

const project = testData.projects[0]

it("should get project", () => {
  const result = getProject(testData, project.owner, project.repo)
  expect(result).toMatchSnapshot()
})

it("should not get project if there is no existing owner", () => {
  const result = getProject(testData, "", project.repo)
  expect(result).toBe(undefined)
})

it("should not get project if there is no existing repo", () => {
  const result = getProject(testData, project.owner, "")
  expect(result).toBe(undefined)
})
