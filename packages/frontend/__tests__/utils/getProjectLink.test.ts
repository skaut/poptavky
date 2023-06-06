import { getProjectLink } from "../../src/utils/getProjectLink"
import { testData } from "../testData"

const project = testData.projects[0]
test("should get project link", () => {
  const result = getProjectLink(project)
  expect(result).toBe("/skaut/skaut-google-drive-gallery")
})
