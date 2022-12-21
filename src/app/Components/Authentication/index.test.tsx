import React from "react";
import { Provider } from "react-redux";
import configureStore from "../../../store";
import Authentication from ".";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const store = configureStore();
describe("Authentication component", () => {
  let getByText;
  let getByRole;
  beforeEach(() => {
    ({ getByRole, getByText } = render(
      <Provider store={store}>
        <Authentication />
      </Provider>
    ));
  });

  it("should render continue button", () => {
    const continueButton = getByText("Continue");
    expect(continueButton).toBeInTheDocument();
  });
  it("displays the heading with the correct text", () => {
    const heading = getByText(/What is your date of birth/);
    expect(heading).toBeInTheDocument();
  });
  it("should display error summary when error is present in state", async () => {
    userEvent.click(screen.getByText("Continue"));
    const errorSummary = screen.getByRole("alert", {
      name: /there is a problem/i,
    });
    await waitFor(() => {
      expect(errorSummary).toBeDefined();
    });
  });
  describe("DateInput", () => {
    it("renders hint with correct text", () => {
      const hintText = getByText(/For example, 31 11 1980/i);
      expect(hintText).toBeInTheDocument();
    });
    it("renders input fields ", () => {
      const dayField = getByRole("textbox", { name: /day/i });
      const monthField = getByRole("textbox", { name: /month/i });
      const yearField = getByRole("textbox", { name: /year/i });

      expect(dayField).toBeInTheDocument();
      expect(monthField).toBeInTheDocument();
      expect(yearField).toBeInTheDocument();
    });

    it("shows empty feelds if the user submits without typing anything", () => {
      const dayField = getByRole("textbox", { name: /day/i });
      const monthField = getByRole("textbox", { name: /month/i });
      const yearField = getByRole("textbox", { name: /year/i });
      dayField.value = "";
      monthField.value = "";
      yearField.value = "";
      const continueButton = getByText("Continue");
      userEvent.click(continueButton);

      expect(dayField.value).toBe("");
      expect(monthField.value).toBe("");
      expect(yearField.value).toBe("");
    });
    it("updates the dob fields when the user types in values", () => {
      const dayField = getByRole("textbox", { name: /day/i });
      const monthField = getByRole("textbox", { name: /month/i });
      const yearField = getByRole("textbox", { name: /year/i });
      userEvent.type(dayField, "10");
      userEvent.type(monthField, "10");
      userEvent.type(yearField, "1990");
      expect(dayField.value).toBe("10");
      expect(monthField.value).toBe("10");
      expect(yearField.value).toBe("1990");
    });
    it("displays error message /Please enter your date of birth to proceed/ if empty date field is submitted ", () => {
      const dayField = getByRole("textbox", { name: /day/i });
      const monthField = getByRole("textbox", { name: /month/i });
      const yearField = getByRole("textbox", { name: /year/i });
      dayField.value = "";
      monthField.value = "";
      yearField.value = "";
      const continueButton = getByText("Continue");
      userEvent.click(continueButton);
      expect(screen.getByRole("alert").textContent).toContain(
        "Please enter your date of birth to proceed"
      );
    });
    it("displays error message /Please input your date of birth in the correct format/ if invalid date field is submitted ", () => {
      const dayField = screen.getByRole("textbox", { name: /day/i });
      const monthField = screen.getByRole("textbox", { name: /month/i });
      const yearField = screen.getByRole("textbox", { name: /year/i });
      userEvent.type(dayField, "100");
      userEvent.type(monthField, "100");
      userEvent.type(yearField, "100");
      const continueButton = getByText("Continue");
      userEvent.click(continueButton);
      expect(screen.getByRole("alert").textContent).toContain(
        "Please input your date of birth in the correct format"
      );
    });
  });
});
