import React from "react";
import { render, act, screen } from "@testing-library/react";
// import { render } from "@jest/globals";
import { AuthPage } from ".";

test("MyComponent", () => {
  const { getByText } = render(<AuthPage />);

  const dilv = getByText("Hello");
  expect(dilv).toBeInTheDocument();
});
