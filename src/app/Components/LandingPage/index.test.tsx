import React from "react";
import { render, screen } from "@testing-library/react";

import { LandingPage } from ".";

describe("WelcomePage", () => {
  it("displays the heading with the correct text", () => {
    const { getByText } = render(<LandingPage />);
    const heading = getByText("Welcome to the form");
    expect(heading).toBeInTheDocument();
  });
  it("renders paragraph with correct text", () => {
    const { getByText } = render(<LandingPage />);
    const paragraph = getByText(/lorem ipsum/i);
    expect(paragraph).toBeInTheDocument();
  });
  it("renders the start button", () => {
    const { getByText } = render(<LandingPage />);
    const button = getByText("Start now");
    expect(button).toBeInTheDocument();
  });
  it("disables the start button", () => {
    render(<LandingPage />);
    const button = screen.getByText("Start now");
    expect(button).toBeDisabled();
  });
});
