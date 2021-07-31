import React, { FunctionComponent } from 'react';

export const Home: FunctionComponent = () => {
  return (
    <div className="home_page">
      <h1>Bem-vindo ao Lista Rango</h1>
      <input type="text" placeholder="Buscar estabelecimento" />
      {Array.from(
        { length: 12 }, 
        (_: unknown, index: number) => 
          (<article key={index} aria-label="Nome do Restaurante" tabIndex={index} role="button">
            <h1>Nome do Restaurante</h1>
            <h2>Endereço do restaurante</h2>
            <img alt="Logotipo do Nome do Restaurante" src="img/nome_do_restaurante.png" />
            <span>Fechado</span>
          </article>)
      )}
    </div>
  );
}
