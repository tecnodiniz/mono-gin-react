// src/App.test.tsx
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import App from "./App";

describe("App", () => {
  it("should render Outlet component", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    // App apenas renderiza Outlet, teste básico é suficiente
  });
});
