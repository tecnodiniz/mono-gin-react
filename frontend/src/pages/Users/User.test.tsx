// src/pages/Users/User.test.tsx
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { User } from "./index";

describe("User", () => {
  it("should render user management header and outlet", () => {
    render(
      <BrowserRouter>
        <User />
      </BrowserRouter>
    );

    expect(screen.getByText("Gerenciamento de usuários")).toBeInTheDocument();
  });
});
