import { useState } from "react";
import Modal from "./Modal";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const ComponentWithModal = () => {
  const [isModal, setIsModal] = useState(false);

  const closeModal = () => setIsModal(false);

  return (
    <>
      <div onClick={() => setIsModal(true)}>Open Modal</div>
      {isModal && (
        <Modal show={isModal} onClose={closeModal}>
          <div
            data-testid={"close-modal-btn"}
            onClick={closeModal}
            className={"modal-close-btn"}
          />
          <div className={"team-modal-content"}>
            <div onClick={closeModal}>Some modal text</div>
          </div>
        </Modal>
      )}
    </>
  );
};

describe("Modal tests", () => {
  test("should render correct text and be able to change modal state", async () => {
    render(<ComponentWithModal />);
    expect(screen.queryByText("Some modal text")).not.toBeInTheDocument();
    await act(async () => userEvent.click(screen.getByText("Open Modal")));
    expect(await screen.findByText("Some modal text")).toBeInTheDocument();
    await act(async () =>
      userEvent.click(screen.getByTestId("close-modal-btn"))
    );
    expect(screen.queryByText("Some modal text")).not.toBeInTheDocument();
  });
});
