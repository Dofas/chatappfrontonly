import { act, render, screen } from "@testing-library/react";
import TypeMessageContainer from "./TypeMessageContainer";
import userEvent from "@testing-library/user-event";
import { RecoilRoot } from "recoil";

describe("Type message container test", () => {
  test("should be able to send message from input when button 'Send' pressed", async () => {
    await act(() => {
      render(<TypeMessageContainer />, { wrapper: RecoilRoot });
    });
    const input = await screen.findByPlaceholderText("Type your message…");
    await userEvent.type(input, "Some text");
    await userEvent.click(screen.getByText("Send"));
    expect(input.value).toEqual("");
  });

  test("should open and close modal window for upload image on a button click", async () => {
    await act(() => {
      render(<TypeMessageContainer />, { wrapper: RecoilRoot });
    });
    expect(screen.queryByText("Select image")).not.toBeInTheDocument();
    const paperClipBtn = await screen.findByTestId("paper-clip-btn");
    await userEvent.click(paperClipBtn);
    expect(await screen.findByText("Select image")).toBeInTheDocument();
    await userEvent.click(paperClipBtn);
    expect(screen.queryByText("Select image")).not.toBeInTheDocument();
  });

  test("should be able to upload image from modal", async () => {
    await act(() => {
      render(<TypeMessageContainer />, { wrapper: RecoilRoot });
    });
    const paperClipBtn = await screen.findByTestId("paper-clip-btn");
    await userEvent.click(paperClipBtn);
    expect(await screen.findByText("Select image")).toBeInTheDocument();
    const uploadImageInput = screen.getByTestId("upload-image-input");
    const file = new File(["hello"], "hello.png", { type: "image/png" });
    await userEvent.upload(uploadImageInput, file);
    expect(uploadImageInput.files[0]).toBe(file);
    expect(uploadImageInput.files.item(0)).toBe(file);
    expect(uploadImageInput.files).toHaveLength(1);
  });
});
