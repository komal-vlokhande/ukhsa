import React from "react";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Authentication from ".";
describe("Authentication", () => {
  it("displays the heading with the correct text", () => {
    const { getByText } = render(<Authentication />);
    const heading = getByText(/date of birth/);
    expect(heading).toBeInTheDocument();
  });
  it("should render continue button", () => {
    const { getByText } = render(<Authentication />);
    const continueButton = getByText("Continue");
    expect(continueButton).toBeInTheDocument();
  });
  it("should display error summary when error is present in state", async () => {
    render(<Authentication />);
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
      const { getByText } = render(<Authentication />);
      const hintText = getByText(/For example, 31 11 1980/i);
      expect(hintText).toBeInTheDocument();
    });
    it("renders input fields ", () => {
      const { getByRole } = render(<Authentication />);
      const dayField = getByRole("textbox", { name: /day/i });
      const monthField = getByRole("textbox", { name: /month/i });
      const yearField = getByRole("textbox", { name: /year/i });
      // console.log(yearField);
      expect(dayField).toBeInTheDocument();
      expect(monthField).toBeInTheDocument();
      expect(yearField).toBeInTheDocument();
    });
    it("displays error message /Please enter your date of birth/ if empty date field is submitted ", () => {
      render(<Authentication />);
      fireEvent.submit(document.querySelector("#dob"));
      expect(screen.getByRole("alert").textContent).toContain(
        "Please enter your date of birth"
      );
    });
    it("displays error message /Please input your date of birth in the correct format/ if invalid date field is submitted ", () => {
      render(<Authentication />);
      const dayField = screen.getByRole("textbox", { name: /day/i });
      const monthField = screen.getByRole("textbox", { name: /month/i });
      const yearField = screen.getByRole("textbox", { name: /year/i });
      fireEvent.change(dayField, { target: { value: "100000" } });
      fireEvent.change(monthField, { target: { value: "10" } });
      fireEvent.change(yearField, { target: { value: "2015" } });
      fireEvent.submit(document.querySelector("#dob"));
      const errorSummary = screen.getByRole("listitem");
      expect(errorSummary).toHaveTextContent(
        "Please input your date of birth in the correct format"
      );
    });
  });
});
