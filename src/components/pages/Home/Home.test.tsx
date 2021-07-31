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

  test("Should be render a restaurant search field", () => {
    render(<Home />);
    const restaurantSearchField = screen.queryByPlaceholderText("Buscar estabelecimento");
    expect(restaurantSearchField).toBeInTheDocument();
  });
});
