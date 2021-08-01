import { render, screen } from "@testing-library/react"
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
})