import ErrorPage from "./ErrorPage";
import { render } from "@testing-library/react";

describe("Error page tests", () => {
  test("should load Error page and correct message", () => {
    const { getByText } = render(<ErrorPage />);
    expect(getByText("Oops something went wrong")).toBeInTheDocument();
  });
});
