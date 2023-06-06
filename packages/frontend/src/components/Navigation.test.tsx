import { MemoryRouter } from "react-router-dom"
import renderer from "react-test-renderer"

import { Navigation } from "./Navigation"

describe("Navigation component", () => {
  test("should render correctly", () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Navigation
            items={[
              {
                title: "Poptávky",
                link: "/",
              },
              {
                title: "Projekty",
                link: "/projekty",
              },
            ]}
          />
        </MemoryRouter>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  test("should render correctly wyth active item", () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Navigation
            items={[
              {
                title: "Poptávky",
                link: "/",
              },
              {
                title: "Projekty",
                link: "/projekty",
                isActive: true,
              },
            ]}
          />
        </MemoryRouter>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
