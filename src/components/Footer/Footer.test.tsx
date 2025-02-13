import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import "@testing-library/jest-dom";

describe("Footer Component", () => {
  test("renders the footer with correct text", () => {
    render(<Footer />);
    expect(
      screen.getByText(
        `© ${new Date().getFullYear()} Tres Comas. All rights reserved.`
      )
    ).toBeInTheDocument();
  });
});
