import { render, screen } from "@testing-library/react";
import { Home } from ".";

describe("<Home />", () => {
  test("Should be render a header title", () => {
    render(<Home />);
    const headerTitle = screen.queryByRole("heading", {
      name: /Bem-vindo ao Lista Rango/i,
    });
    expect(headerTitle).toBeInTheDocument();
  });
});
