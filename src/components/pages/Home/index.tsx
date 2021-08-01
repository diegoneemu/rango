import React, { FunctionComponent, useEffect, useState } from 'react';
import {getRestaurants} from './getRestaurants';

export type OpeningHours = {
  from: string;
  to: string;
  days: number[];
};

export type Restaurant = {
  id: number,
  name: string,
  address: string,
  image: string,
  hours: OpeningHours[]
}

export const Home: FunctionComponent = () => {
  const [restaurants, setRestaurants] = useState<Array<Restaurant>>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  
  const fetchRestaurants = async function () {
    try {
      const restaurants = await getRestaurants();
      setRestaurants(restaurants);
    } catch (ex) {
      console.error(`Falha ao carregar restaurantes`, ex);
    }
  };

  useEffect(()=>{
    fetchRestaurants();
  }, [])

  return (
    <div className="home_page">
      <h1>Bem-vindo ao Lista Rango</h1>
      <input type="text" placeholder="Buscar estabelecimento" />
      {isLoading && <img alt="Loading" src="img/loading.gif" />}
      {restaurants.map((restaurant: Restaurant, index: number) => 
          (<article key={restaurant.id} aria-label={restaurant.name} tabIndex={index} role="button">
            <h1>{restaurant.name}</h1>
            <h2>{restaurant.address}</h2>
            <img alt={`Logotipo do ${restaurant.name}`} src={`img/${toSnakeCase(`${restaurant.id}_${restaurant.name}`)}.png`} />
            <span>Fechado</span>
          </article>)
      )}
    </div>
  );
}

function toSnakeCase(text: string){
  return text.replace(/\s/g, "_");
}