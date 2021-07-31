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

  test("Should be render a restaurant cards", () => {
    const {debug } = render(<Home />);
    const restaurantCards = screen.queryAllByRole("button",{name: /Nome do Restaurante/i});
    expect(restaurantCards.length).toEqual(12);
    debug();
    restaurantCards.forEach((restaurantCard: HTMLElement, index: number)=>{
      expect(restaurantCard).toHaveAttribute("tabindex");
      expect(restaurantCard.getAttribute("tabindex")).toEqual(index.toString());
      expect(restaurantCard).toHaveTextContent(/Nome do Restaurante/i);
      expect(restaurantCard).toHaveTextContent(/Endereço do restaurante/i);
      expect(restaurantCard).toHaveAccessibleName(/Nome do Restaurante/i);
      expect(restaurantCard).toHaveTextContent(/(Aberto agora)|(Fechado)/i);

      const restaurantLogo = restaurantCard.querySelector("img") as HTMLImageElement;
      const src = restaurantLogo.getAttribute("src");
      const alt = restaurantLogo.getAttribute("alt");

      expect(src).toEqual("img/nome_do_restaurante.png");
      expect(alt).toEqual("Logotipo do Nome do Restaurante");
    })
  })
});
