import { render } from "@testing-library/react";
import App from "./App";
import { RecoilRoot } from "recoil";

describe("App routes tests", () => {
  test("should show spinner while fetching user and then show content", async () => {
    const { getByTestId, findByTestId } = render(<App />, {
      wrapper: RecoilRoot,
    });
    expect(getByTestId("spinner-container-data-id")).toBeInTheDocument();
    expect(await findByTestId("user-page-content-data-id")).toBeInTheDocument();
  });

  test("should load Error page if user typed wrong path", () => {
    const wrongPath = "wrong/path";
    window.history.pushState({}, "", wrongPath);
    const { getByText } = render(<App />);
    expect(getByText("Oops something went wrong")).toBeInTheDocument();
  });
});
