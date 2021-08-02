import { Restaurant } from "../../Home/index";

export const getRestaurant = async (): Promise<Restaurant> => {
  return Promise.resolve({id:1,name:"",address:"",hours:[],image:""});
}
