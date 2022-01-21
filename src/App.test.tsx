import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("Renders todo list on homepage", () => {
  render(<App />);
  const linkElement = screen.getByText(/Todo List/i);
  expect(linkElement).toBeInTheDocument();
});
