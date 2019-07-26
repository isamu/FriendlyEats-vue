import * as FriendlyEatsMock from "@/components/FriendlyEats.Mock";

export const getAllRestaurants = () => {
  const restaurants = [];
  for(var i = 0; i < 20; i ++ ) {
    restaurants.push(FriendlyEatsMock.getRandomRestaurant());
  }
  return restaurants;
}

