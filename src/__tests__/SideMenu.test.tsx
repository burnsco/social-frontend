import SideMenu from "@/components/ui/SideMenu/NoAuth"
import { CategoriesDocument } from "@/generated/graphql"
import { render, waitForElementToBeRemoved } from "@/utils/test-utils"
import { MockedProvider } from "@apollo/client/testing"
import "@testing-library/jest-dom"

const useRouter = jest.spyOn(require("next/router"), "useRouter")

const mocks = {
  request: {
    query: CategoriesDocument
  },
  result: {
    data: {
      categories: [
        { id: "1", name: "react" },
        { id: "2", name: "movies" },
        { id: "3", name: "tv" }
      ]
    }
  }
}

describe("Sidebar", () => {
  it("Renders 3 categories and router path is working.' ", async () => {
    useRouter.mockImplementation(() => ({
      route: "/r/[category]",
      pathname: "/r/[category]",
      query: { category: "react" },
      asPath: "/r/react"
    }))
    const { getByText } = render(
      <MockedProvider
        defaultOptions={{
          watchQuery: { fetchPolicy: "no-cache" },
          query: { fetchPolicy: "no-cache" }
        }}
        mocks={[mocks]}
        addTypename={false}
      >
        <SideMenu />
      </MockedProvider>
    )

    const loading = getByText(/loading/i)
    expect(loading).toBeInTheDocument()

    await waitForElementToBeRemoved(loading).then(() => {
      const cat1 = getByText(/react/i)
      expect(cat1).toBeInTheDocument()
      const cat2 = getByText(/movies/i)
      expect(cat2).toBeInTheDocument()
      const cat3 = getByText(/tv/i)
      expect(cat3).toBeInTheDocument()
    })
  })
})
