import { testData } from "../testData"
import { getProjectLink } from "../../src/utils/getProjectLink"

const project = testData.projects[0]
test("should get project link", () => {
  const result = getProjectLink(project)
  expect(result).toBe("/skaut/skaut-google-drive-gallery")
})
