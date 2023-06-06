import { testData } from "../testData"
import { getIssueLink } from "../../src/utils/getIssueLink"

test("should get issue link", () => {
  const project = testData.projects[0]
  const result = getIssueLink({
    project: { ...project, ...project.info },
    ...project.issues[1],
  })
  expect(result).toBe("/skaut/skaut-google-drive-gallery/2")
})
