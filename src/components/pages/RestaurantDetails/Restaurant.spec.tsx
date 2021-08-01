import { render, screen } from "@testing-library/react"
import { RestaurantDetails } from "."

describe("<RestaurantDetails />", ()=>{
  test("Should be render a restaurant name", ()=>{
    render(<RestaurantDetails />)

    const restaurantName = screen.queryByRole("heading", { name: /Nome do Restaurante/});

    expect(restaurantName).toBeInTheDocument();
  })
})