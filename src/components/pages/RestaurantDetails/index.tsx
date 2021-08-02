import { useEffect, useState } from "react";
import { FunctionComponent } from "react";
import { Restaurant } from "../Home";
import { getRestaurant } from "./getRestaurant";

export const RestaurantDetails: FunctionComponent = () => {
  const [isLunchExpanded, setLunchExpanded] = useState<boolean>(false);
  const [isDrinkExpanded, setDrinkExpanded] = useState<boolean>(false);
  const [isDessertsExpanded, setDessertsExpanded] = useState<boolean>(false);
  const [isSideDishExpanded, setSideDishExpanded] = useState<boolean>(false);
  const [restaurant, setRestaurant] = useState<Restaurant>();

  const fetchRestaurant = async function () {
    try {
      const restaurant = await getRestaurant();
      setRestaurant(restaurant);
    } catch (ex) {
      console.error(`Falha ao carregar restaurantes`, ex);
    }
  };

  useEffect(()=>{
    fetchRestaurant();
  }, [])

  return (
  <div>
    <img alt={`Logotipo do ${restaurant?.name}`} src={restaurant?.image} />
    <h1>{restaurant?.name}</h1>
    <p aria-label="Endereço do Restaurante">{restaurant?.address}</p>
    <article aria-label="Horário de Funcionamento">
      {restaurant && <>
        {<p>Segunda à Sexta: {restaurant.hours[0].from} às {restaurant.hours[0].to}</p>}
        {<p>Sábados: {restaurant.hours[1].from} às {restaurant.hours[1].to}</p>}
        {<p>Domingos e Feriados: {restaurant.hours[2].from} às {restaurant.hours[2].to}</p>}
      </>}
    </article>
    <label>
      Buscar no cardápio
      <input type="text" />
      <img alt="Ícone busca" src="img/search_ico.png" />
    </label>
    <a
      href="#almocos"
      onClick={()=> setLunchExpanded((prevExpanded)=> !prevExpanded)}
      role="button"
      aria-controls="lunch-collapsed-panel"
      aria-expanded={isLunchExpanded}
    >
      Almoços
    </a>
    <section
      aria-label="Almoços"
      id="lunch-collapsed-panel"
      aria-hidden={!isLunchExpanded}
      style={{boxSizing: "border-box", display: isLunchExpanded ? "block" : "none", overflow: "hidden"}}
    >
      <article aria-label="Prato">
        <img src="img/dish.png" alt="Foto do Prato" />
        <h1>Nome do Prato</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</p>
        <span>R$ 19,90</span>
      </article>
      <article aria-label="Prato">
        <img src="img/dish.png" alt="Foto do Prato" />
        <h1>Nome do Prato</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</p>
        <span>R$ 19,90</span>
      </article>
    </section>
    <a
      href="#bebidas"
      onClick={()=> setDrinkExpanded((prevExpanded)=> !prevExpanded)}
      role="button"
      aria-controls="drinks-collapsed-panel"
      aria-expanded={isDrinkExpanded}
    >
      Bebidas
    </a>
    <section
      aria-label="Bebidas"
      id="drinks-collapsed-panel"
      aria-hidden={!isDrinkExpanded}
      style={{boxSizing: "border-box", display: isDrinkExpanded ? "block" : "none", overflow: "hidden"}}
    ></section>
    <a
      href="#sobremesas"
      onClick={()=> setDessertsExpanded((prevExpanded)=> !prevExpanded)}
      role="button"
      aria-controls="drinks-collapsed-panel"
      aria-expanded={isDessertsExpanded}
    >
      Sobremesas
    </a>
    <section
      aria-label="Sobremesas"
      id="drinks-collapsed-panel"
      aria-hidden={!isDessertsExpanded}
      style={{boxSizing: "border-box", display: isDessertsExpanded ? "block" : "none", overflow: "hidden"}}
    ></section>
    <a
      href="#acompanhamentos"
      onClick={()=> setSideDishExpanded((prevExpanded)=> !prevExpanded)}
      role="button"
      aria-controls="drinks-collapsed-panel"
      aria-expanded={isSideDishExpanded}
    >
      Acompanhamentos
    </a>
    <section
      aria-label="Acompanhamentos"
      id="drinks-collapsed-panel"
      aria-hidden={!isSideDishExpanded}
      style={{boxSizing: "border-box", display: isSideDishExpanded ? "block" : "none", overflow: "hidden"}}
    ></section>
  </div>);
};
