import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { Home } from ".";
import { getRestaurants } from "./getRestaurants";

jest.mock("./getRestaurants", () => ({
  __esModule: true,
  default: "mockedDefaultExport",
  getRestaurants: jest.fn(),
}));

describe("<Home />", () => {
  beforeEach(() => {
    (getRestaurants as jest.Mock).mockResolvedValue([])
  });

  afterEach(cleanup);

  test("Should be render a header title", async () => {
    render(<Home />);
    const headerTitle = await waitFor(() =>
      screen.queryByRole("heading", {
        name: /Bem-vindo ao Lista Rango/i,
      })
    );
    expect(headerTitle).toBeInTheDocument();
  });

  test("Should be render a restaurant search field", async () => {
    render(<Home />);
    const restaurantSearchField = await waitFor(() =>
      screen.queryByPlaceholderText("Buscar estabelecimento")
    );
    expect(restaurantSearchField).toBeInTheDocument();
  });

  test("Should be render a restaurant cards", async () => {
    (getRestaurants as jest.Mock).mockResolvedValueOnce(
      Array.from({ length: 12 }, (_: unknown, index: number) => ({
        id: index,
        name: "Nome do Restaurante",
        address: "Endereço do restaurante",
        image: `img/${index}_nome_do_restaurante.png`,
        hours: [],
      }))
    );

    render(<Home />);

    const restaurantCards = await waitFor(
      async () =>
        await screen.findAllByRole("button", {
          name: /Nome do Restaurante/i,
        })
    );

    expect(restaurantCards.length).toEqual(12);

    restaurantCards.forEach((restaurantCard: HTMLElement, index: number) => {
      expect(restaurantCard).toHaveAttribute("tabindex");
      expect(restaurantCard.getAttribute("tabindex")).toEqual(index.toString());
      expect(restaurantCard).toHaveTextContent(/Nome do Restaurante/i);
      expect(restaurantCard).toHaveTextContent(/Endereço do restaurante/i);
      expect(restaurantCard).toHaveAccessibleName(/Nome do Restaurante/i);
      expect(restaurantCard).toHaveTextContent(/(Aberto agora)|(Fechado)/i);

      const restaurantLogo = restaurantCard.querySelector(
        "img"
      ) as HTMLImageElement;
      const src = restaurantLogo.getAttribute("src");
      const alt = restaurantLogo.getAttribute("alt");

      expect(src).toEqual(`img/${index}_Nome_do_Restaurante.png`);
      expect(alt).toEqual("Logotipo do Nome do Restaurante");
    });
  });

  test("Should be render a loading gif when fetch restaurants", async ()=>{
    render(<Home />);

    const loadingElement = await waitFor(()=>screen.queryByAltText("Loading"));
    expect(loadingElement).toBeInTheDocument();

    const src = loadingElement?.getAttribute("src");
    expect(src).toEqual("img/loading.gif");
  })
});
