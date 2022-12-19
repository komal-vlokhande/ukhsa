import React from "react";
import { render, act, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthPage } from ".";

describe("AuthPage", () => {
  it("displays the heading with the correct text", () => {
    const { getByText } = render(<AuthPage />);

    const heading = getByText(/date of birth/);
    expect(heading).toBeInTheDocument();
  });
  it("should render continue button", () => {
    const { getByText } = render(<AuthPage />);

    const continueButton = getByText("Continue");
    expect(continueButton).toBeInTheDocument();
  });
  it("should display error summary when error is present in state", async () => {
    render(<AuthPage />);

    userEvent.click(screen.getByText("Continue"));
    const errorSummary = screen.getByRole("alert", {
      name: /there is a problem/i,
    });
    await waitFor(() => {
      expect(errorSummary).toBeDefined();
    });
  });
  describe("DateInput", () => {
    it("renders hint text", () => {
      const { getByText } = render(<AuthPage />);
      const hintText = getByText(/For example, 31 11 1980/i);
      expect(hintText).toBeInTheDocument();
    });
    it("renders input fields ", () => {
      const { getByRole } = render(<AuthPage />);
      const dayField = getByRole("textbox", { name: /day/i });
      const monthField = getByRole("textbox", { name: /month/i });
      const yearField = getByRole("textbox", { name: /year/i });
      expect(dayField).toBeInTheDocument();
      expect(monthField).toBeInTheDocument();
      expect(monthField).toBeInTheDocument();
    });
  });
});
