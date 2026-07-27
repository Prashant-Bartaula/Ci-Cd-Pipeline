import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders heading", () => {
  render(<App />);

  expect(screen.getByText("Hello CI/CD!")).toBeInTheDocument();
});