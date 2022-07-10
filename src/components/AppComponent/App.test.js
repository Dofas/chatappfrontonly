import { render, waitFor } from "@testing-library/react";
import App from "./App";
import { RecoilRoot } from "recoil";

describe("App routes tests", () => {
  test("should show spinner while fetching user and then show content", async () => {
    const { getByTestId } = render(<App />, { wrapper: RecoilRoot });
    expect(getByTestId("spinner-container-data-id")).toBeInTheDocument();
    await waitFor(() =>
      expect(getByTestId("user-page-content-data-id")).toBeInTheDocument()
    );
  });

  test("should load Error page if user typed wrong path", () => {
    const wrongPath = "wrong/path";
    window.history.pushState({}, "", wrongPath);
    const { getByText } = render(<App />);
    expect(getByText("Oops something went wrong")).toBeInTheDocument();
  });
});
