import { useState } from "react";
import { FunctionComponent } from "react";

export const RestaurantDetails: FunctionComponent = () => {
  const [isLunchExpanded, setLunchExpanded] = useState<boolean>(false);
  const [isDrinkExpanded, setDrinkExpanded] = useState<boolean>(false);
  const [isDessertsExpanded, setDessertsExpanded] = useState<boolean>(false);
  const [isSideDishExpanded, setSideDishExpanded] = useState<boolean>(false);

  return (<div>
    <img alt="Logotipo do Nome do Restaurante" src="img/0_nome_do_restaurante.png" />
    <h1>Nome do Restaurante</h1>
    <p aria-label="Endereço do Restaurante">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    <article aria-label="Horário de Funcionamento">
      <p>Segunda à Sexta: 11:30 às 15:00</p>
      <p>Sábados: 11:30 às 22:00</p>
      <p>Domingos e Feriados: 11:30 às 15:00</p>
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
    ></section>
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
