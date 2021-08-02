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
})