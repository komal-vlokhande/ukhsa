import React from "react";
import { render, screen } from "@testing-library/react";
import { AuthPage } from ".";
describe("AuthPage", () => {
  // it("renders the DateInputComponent", ()=>{
  //     const {getBy}
  // }),
  it("should render the error summary when errorMessage is present", () => {
    const { getByText } = render(<AuthPage />);
    const errorSummary = getByText(/What is your date of birth/i);
    expect(errorSummary).toBeInTheDocument();
  });
});
