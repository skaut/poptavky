import { testData } from "../testData"
import { getProjectLink } from "./getProjectLink"

const project = testData.projects[0]
it("should get project link", () => {
  const result = getProjectLink(project)
  expect(result).toBe("/skaut/skaut-google-drive-gallery")
})
