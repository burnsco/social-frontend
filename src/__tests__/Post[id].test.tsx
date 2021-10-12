import PostAndCommentsPage from "@/components/pages/SinglePost/SingePostPage"
import { PostDocument } from "@/generated/graphql"
import { render, waitForElementToBeRemoved } from "@/utils/test-utils"
import { MockedProvider } from "@apollo/client/testing"
import "@testing-library/jest-dom"

const useRouter = jest.spyOn(require("next/router"), "useRouter")

const mocks = {
  request: {
    query: PostDocument,
    variables: {
      postId: "1"
    }
  },
  result: {
    data: {
      post: {
        author: {
          id: "1",
          username: "bob"
        },
        category: {
          id: "1",
          name: "react"
        },
        comments: [],
        createdAt: "1603212919000",
        id: "1",
        image: "",
        link: "",
        text: "you agree?",
        title: "react rocks!",
        totalComments: {
          count: 0
        },
        totalVotes: {
          count: 0,
          score: null
        },
        updatedAt: "1603212919000",
        video: ""
      }
    }
  }
}

jest.mock("next/dynamic", () => () => {
  const DynamicComponent = () => null
  DynamicComponent.displayName = "LoadableComponent"
  DynamicComponent.preload = jest.fn()
  return DynamicComponent
})

describe("Single Post", () => {
  it("Author/Category/Text/Title renders.' ", async () => {
    useRouter.mockImplementation(() => ({
      route: "/r/[category]/[id]",
      pathname: "/r/[category]/[id]",
      query: { id: "1", category: "react" },
      asPath: "/r/react/1"
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
        <PostAndCommentsPage />
      </MockedProvider>
    )

    const loading = getByText(/loading/i)
    expect(loading).toBeInTheDocument()

    await waitForElementToBeRemoved(loading).then(() => {
      const author = getByText(/bob/i)
      expect(author).toBeInTheDocument()
      const category = getByText(/react rocks!/i)
      expect(category).toBeInTheDocument()
      const text = getByText(/you agree?/i)
      expect(text).toBeInTheDocument()
      const title = getByText(/react rocks!/i)
      expect(title).toBeInTheDocument()
    })
  })
})
