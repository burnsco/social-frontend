import RegisterPage from "@/components/pages/Register/Register"
import { fireEvent, render } from "@/utils/test-utils"
import { MockedProvider } from "@apollo/client/testing"
import "@testing-library/jest-dom"

jest.mock("next/dynamic", () => () => {
  const DynamicComponent = () => null
  DynamicComponent.displayName = "LoadableComponent"
  DynamicComponent.preload = jest.fn()
  return DynamicComponent
})

describe("Register", () => {
  it("shows required when given empty values on each field", async () => {
    const { getByRole, getByText, findAllByText } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <RegisterPage />
      </MockedProvider>
    )
    const submit = getByRole("button", { name: /submit/i })
    expect(submit).toBeInTheDocument()

    fireEvent.click(submit)
    const loading = getByText("Loading...")
    expect(loading).toBeInTheDocument()

    const warning = await findAllByText(/required/i)
    expect(warning).toHaveLength(3)
  })
})
