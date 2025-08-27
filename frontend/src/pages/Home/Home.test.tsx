// src/pages/Home/Home.test.tsx
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import Home from "./index";

describe("Home", () => {
  it("should render users link", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const usersLink = screen.getByRole("link", { name: /users/i });
    expect(usersLink).toBeInTheDocument();
    expect(usersLink).toHaveAttribute("href", "/users");
  });
});
