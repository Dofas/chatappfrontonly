import { render } from "@testing-library/react";
import App from "./App";

describe("App routes tests", () => {
  test("should load Error page if user typed wrong path", () => {
    const wrongPath = "wrong/path";
    window.history.pushState({}, "", wrongPath);
    const { getByText } = render(<App />);
    expect(getByText("Oops something went wrong")).toBeInTheDocument();
  });
});
