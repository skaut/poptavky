import renderer from "react-test-renderer"
import { Navigation } from "./Navigation"
import { MemoryRouter } from "react-router-dom"

describe("Navigation component", () => {
  it("should renders correctly", () => {
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
  it("should renders correctly wyth active item", () => {
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
