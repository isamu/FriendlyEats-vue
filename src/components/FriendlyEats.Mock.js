import * as FriendlyEats from "@/components/FriendlyEats";

export const getRandomRestaurant = () => {
  const category = FriendlyEats.getRandomItem(FriendlyEats.data.categories);
  const city = FriendlyEats.getRandomItem(FriendlyEats.data.cities);
  const price = Math.floor(Math.random() * 4) + 1;
  const photoID = Math.floor(Math.random() * 22) + 1;
  const photo = 'https://storage.googleapis.com/firestorequickstarts.appspot.com/food_' + photoID + '.png';
  
  return {
    category,
    price,
    photo,
    city,
    name: FriendlyEats.getRandomItem(FriendlyEats.data.name) + " " + FriendlyEats.getRandomItem(FriendlyEats.data.name2),
  };
}
