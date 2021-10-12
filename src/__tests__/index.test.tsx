import { gql, InMemoryCache } from "@apollo/client"
import { MockedProvider } from "@apollo/client/testing"
import "@testing-library/jest-dom"
import renderer from "react-test-renderer"
import Index from "../pages"

jest.mock("next/dynamic", () => () => {
  const DynamicComponent = () => null
  DynamicComponent.displayName = "LoadableComponent"
  DynamicComponent.preload = jest.fn()
  return DynamicComponent
})

const cache = new InMemoryCache()
cache.writeQuery({
  query: gql`
    query Viewer {
      me {
        id
        username
      }
    }
  `,
  data: {
    viewer: {
      __typename: "User",
      id: "asdf111f",
      name: "TestUser"
    }
  }
})

describe("Index", () => {
  it("renders the html we want", async () => {
    const component = renderer.create(
      <MockedProvider cache={cache}>
        <Index />
      </MockedProvider>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})
