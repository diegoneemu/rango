import React, { FunctionComponent } from 'react';

export const Home: FunctionComponent = () => {
  return (
    <div className="home_page">
      <h1>Bem-vindo ao Lista Rango</h1>
      <input type="text" placeholder="Buscar estabelecimento" />
    </div>
  );
}
