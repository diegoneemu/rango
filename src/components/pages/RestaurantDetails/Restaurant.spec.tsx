import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react"
import { RestaurantDetails } from "."
import { getRestaurant } from "./getRestaurant"

jest.mock("./getRestaurant", () => ({
  __esModule: true,
  default: "mockedDefaultExport",
  getRestaurant: jest.fn(),
}));

describe("<RestaurantDetails />", ()=>{
  beforeEach(()=>{
    (getRestaurant as jest.Mock).mockResolvedValue({
      id: 1,
      name: "Nome do Restaurante",
      address: "Endereço do Restaurante",
      hours: [
        {
          from: "11:30",
          to: "15:00",
          days: [2,3,4,5,6]
        },
        {
          from: "11:30",
          to: "22:00",
          days: [7]
        },
        {
          from: "11:30",
          to: "15:00",
          days: [1]
        }
      ],
      image: "img/1_nome_do_restaurante.png"
    });
  });

  afterEach(cleanup);

  test("Should be render a restaurant name", async ()=>{
    render(<RestaurantDetails />)

    const restaurantName = await waitFor(async ()=> await screen.findByRole("heading", { name: /Nome do Restaurante/}));

    expect(restaurantName).toBeInTheDocument();
  })

  test("Should be render a restaurant logo", async ()=>{
    render(<RestaurantDetails />)

    const restaurantLogo = await waitFor(async ()=> await screen.findByAltText("Logotipo do Nome do Restaurante"));

    expect(restaurantLogo).toBeInTheDocument();

    const src = restaurantLogo?.getAttribute("src");

    expect(src).toEqual("img/1_nome_do_restaurante.png");
  })

  test("Should be render a restaurant address", async () => {
    render(<RestaurantDetails />)

    const restaurantAddress = await waitFor(()=>screen.queryByLabelText(/Endereço do Restaurante/));

    expect(restaurantAddress).toBeInTheDocument();
  })

  test("Should be render a restaurant opening hours", async () => {
    render(<RestaurantDetails />)

    const restaurantOpeningHours = await waitFor(()=>screen.queryByLabelText(/Horário de Funcionamento/));

    expect(restaurantOpeningHours).toBeInTheDocument();
    expect(restaurantOpeningHours).toHaveTextContent(/Segunda à Sexta: 11:30 às 15:00/);
    expect(restaurantOpeningHours).toHaveTextContent(/Sábados: 11:30 às 22:00/)
    expect(restaurantOpeningHours).toHaveTextContent(/Domingos e Feriados: 11:30 às 15:00/)
  })

  test("Should be render a restaurant search field", async () => {
    render(<RestaurantDetails />);
    const menuSearchField = await waitFor(()=>screen.queryByLabelText("Buscar no cardápio"))
    expect(menuSearchField).toBeInTheDocument();
  });

  test("Should be render a collapsed lunch menu items group", async ()=>{
    render(<RestaurantDetails />);

    const lunchButtonToggle = await waitFor(()=>screen.queryByRole("button", { name: /Almoços/}))
    const lunchContainer = await waitFor(()=>screen.queryByLabelText(/Almoços/));

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

    const drinksButtonToggle = await waitFor(()=>screen.queryByRole("button", { name: /Bebidas/}))
    const drinksContainer = await waitFor(()=>screen.queryByLabelText(/Bebidas/));

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

    const dessertsButtonToggle = await waitFor(()=>screen.queryByRole("button", { name: /Sobremesas/}))
    const dessertsContainer = await waitFor(()=>screen.queryByLabelText(/Sobremesas/));

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

    const sideDishButtonToggle = await waitFor(()=>screen.queryByRole("button", { name: /Acompanhamentos/}))
    const sideDishContainer = await waitFor(()=>screen.queryByLabelText(/Acompanhamentos/));

    expect(sideDishButtonToggle).toBeInTheDocument();
    expect(sideDishContainer).not.toBeVisible();

    if(sideDishButtonToggle){
      fireEvent.click(sideDishButtonToggle);
    }

    expect(sideDishButtonToggle?.getAttribute("aria-expanded")).toBe('true');
    expect(sideDishContainer).toBeVisible();
  })

  test("Should be render a visible dish card in menu itens group container when click in toggle button", async () => {
    render(<RestaurantDetails />);

    const lunchButtonToggle = await waitFor(()=>screen.queryByRole("button", { name: /Almoços/}))
    const dishCards = await waitFor(()=>screen.queryAllByLabelText("Prato"));

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

  test("Should be render a visible dish card with dish information", async () => {
    render(<RestaurantDetails />);

    const lunchButtonToggle = await waitFor(()=>screen.queryByRole("button", { name: /Almoços/}))

    if(lunchButtonToggle){
      fireEvent.click(lunchButtonToggle);
    }

    const dishCards = await waitFor(()=>screen.queryAllByLabelText("Prato"));

    expect(dishCards).toHaveLength(2);
    dishCards.forEach((dishCard: HTMLElement) => {
      expect(dishCard).toBeVisible();
      expect(dishCard).toHaveTextContent("Nome do Prato");
      expect(dishCard).toHaveTextContent("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do");
      expect(dishCard).toHaveTextContent(/R\$\s(?!0+\,00)((\d{1,3}\.)*)(\d{1,3}),(\d{2})$/g);
    })
  })
})