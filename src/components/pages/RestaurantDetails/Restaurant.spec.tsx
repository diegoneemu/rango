import { render, screen } from "@testing-library/react"
import { FunctionComponent } from "react"

const RestaurantDetails: FunctionComponent = () => {
  return (<div></div>)
}

describe("<RestaurantDetails />", ()=>{
  test("Should be render a restaurant name", ()=>{
    render(<RestaurantDetails />)

    const restaurantName = screen.queryByRole("heading", { name: /Nome do Restaurante/});

    expect(restaurantName).toBeInTheDocument();
  })
})