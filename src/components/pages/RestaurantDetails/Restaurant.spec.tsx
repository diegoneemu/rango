import { fireEvent, render, screen } from "@testing-library/react"
import { RestaurantDetails } from "."

describe("<RestaurantDetails />", ()=>{
  test("Should be render a restaurant name", ()=>{
    render(<RestaurantDetails />)

    const restaurantName = screen.queryByRole("heading", { name: /Nome do Restaurante/});

    expect(restaurantName).toBeInTheDocument();
  })

  test("Should be render a restaurant logo", ()=>{
    render(<RestaurantDetails />)

    const restaurantLogo = screen.queryByAltText("Logotipo do Nome do Restaurante");

    expect(restaurantLogo).toBeInTheDocument();

    const src = restaurantLogo?.getAttribute("src");

    expect(src).toEqual("img/0_nome_do_restaurante.png");
  })

  test("Should be render a restaurant address", () => {
    render(<RestaurantDetails />)

    const restaurantAddress = screen.queryByLabelText(/Endereço do Restaurante/);

    expect(restaurantAddress).toBeInTheDocument();
  })

  test("Should be render a restaurant opening hours", () => {
    render(<RestaurantDetails />)

    const restaurantOpeningHours = screen.queryByLabelText(/Horário de Funcionamento/);

    expect(restaurantOpeningHours).toBeInTheDocument();
    expect(restaurantOpeningHours).toHaveTextContent(/Segunda à Sexta: /);
    expect(restaurantOpeningHours).toHaveTextContent(/Sábados: /)
    expect(restaurantOpeningHours).toHaveTextContent(/Domingos e Feriados: /)
  })

  test("Should be render a restaurant search field", async () => {
    render(<RestaurantDetails />);
    const menuSearchField = screen.queryByLabelText("Buscar no cardápio")
    expect(menuSearchField).toBeInTheDocument();
  });

  test("Should be render a collapsed lunch menu items group", async ()=>{
    render(<RestaurantDetails />);

    const lunchButtonToggle = screen.queryByRole("button", { name: /Almoços/})
    const lunchContainer = screen.queryByLabelText(/Almoços/);

    expect(lunchButtonToggle).toBeInTheDocument();
    expect(lunchContainer).not.toBeVisible();

    if(lunchButtonToggle){
      fireEvent.click(lunchButtonToggle);
    }

    expect(lunchButtonToggle?.getAttribute("aria-expanded")).toBe('true');
    expect(lunchContainer).toBeVisible();
  })

  test("Should be render a collapsed drinks menu items group", async ()=>{
    render(<RestaurantDetails />);

    const drinksButtonToggle = screen.queryByRole("button", { name: /Bebidas/})
    const drinksContainer = screen.queryByLabelText(/Bebidas/);

    expect(drinksButtonToggle).toBeInTheDocument();
    expect(drinksContainer).not.toBeVisible();

    if(drinksButtonToggle){
      fireEvent.click(drinksButtonToggle);
    }

    expect(drinksButtonToggle?.getAttribute("aria-expanded")).toBe('true');
    expect(drinksContainer).toBeVisible();
  })

  test("Should be render a collapsed desserts menu items group", async ()=>{
    render(<RestaurantDetails />);

    const dessertsButtonToggle = screen.queryByRole("button", { name: /Sobremesas/})
    const dessertsContainer = screen.queryByLabelText(/Sobremesas/);

    expect(dessertsButtonToggle).toBeInTheDocument();
    expect(dessertsContainer).not.toBeVisible();

    if(dessertsButtonToggle){
      fireEvent.click(dessertsButtonToggle);
    }

    expect(dessertsButtonToggle?.getAttribute("aria-expanded")).toBe('true');
    expect(dessertsContainer).toBeVisible();
  })

  test("Should be render a collapsed side dish menu items group", async ()=>{
    render(<RestaurantDetails />);

    const sideDishButtonToggle = screen.queryByRole("button", { name: /Acompanhamentos/})
    const sideDishContainer = screen.queryByLabelText(/Acompanhamentos/);

    expect(sideDishButtonToggle).toBeInTheDocument();
    expect(sideDishContainer).not.toBeVisible();

    if(sideDishButtonToggle){
      fireEvent.click(sideDishButtonToggle);
    }

    expect(sideDishButtonToggle?.getAttribute("aria-expanded")).toBe('true');
    expect(sideDishContainer).toBeVisible();
  })

  test("Should be render a visible dish card in menu itens group container when click in toggle button", () => {
    render(<RestaurantDetails />);

    const lunchButtonToggle = screen.queryByRole("button", { name: /Almoços/})
    const dishCards = screen.queryAllByLabelText("Prato");

    expect(dishCards).toHaveLength(2);
    dishCards.forEach((dishCard: HTMLElement) => {
      expect(dishCard).not.toBeVisible();
    })

    if(lunchButtonToggle){
      fireEvent.click(lunchButtonToggle);
    }

    dishCards.forEach((dishCard: HTMLElement) => {
      expect(dishCard).toBeVisible();
    })
  })

  test("Should be render a visible dish card with dish information", () => {
    render(<RestaurantDetails />);

    const lunchButtonToggle = screen.queryByRole("button", { name: /Almoços/})

    if(lunchButtonToggle){
      fireEvent.click(lunchButtonToggle);
    }

    const dishCards = screen.queryAllByLabelText("Prato");

    expect(dishCards).toHaveLength(2);
    dishCards.forEach((dishCard: HTMLElement) => {
      expect(dishCard).toBeVisible();
      expect(dishCard).toHaveTextContent("Nome do Prato");
      expect(dishCard).toHaveTextContent("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do");
      expect(dishCard).toHaveTextContent(/R\$\s(?!0+\,00)((\d{1,3}\.)*)(\d{1,3}),(\d{2})$/g);
    })
  })
})