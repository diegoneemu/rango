import { FunctionComponent } from "react";

export const RestaurantDetails: FunctionComponent = () => {
  return (<div>
    <img alt="Logotipo do Nome do Restaurante" src="img/0_nome_do_restaurante.png" />
    <h1>Nome do Restaurante</h1>
    <p aria-label="Endereço do Restaurante">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    <article aria-label="Horário de Funcionamento">
      <p>Segunda à Sexta: 11:30 às 15:00</p>
      <p>Sábados: 11:30 às 22:00</p>
      <p>Domingos e Feriados: 11:30 às 15:00</p>
    </article>
  </div>);
};
