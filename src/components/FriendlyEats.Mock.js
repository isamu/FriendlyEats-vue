import * as FriendlyEats from "@/components/FriendlyEats";
import * as FriendlyEatsData from "@/components/FriendlyEats.Data";

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
    numRatings: 0,
    avgRating: 0,
  };
}

export const addMockRestaurants = () => {
  const promises = [];
  for (let i = 0; i < 20; i++) {
    const data = getRandomRestaurant();
    const promise = FriendlyEatsData.addRestaurant(data);

    if (!promise) {
      return Promise.reject();
    } else {
      promises.push(promise);
    }
  }
  return Promise.all(promises);
}

export const addMockRatings = async (restaurantID) =>  {
  const ratings = [];
  for (let r = 0; r < 10 * Math.random(); r++) {
    let rating = FriendlyEats.data.ratings[
      parseInt(FriendlyEats.data.ratings.length * Math.random())
    ];
    rating.userName = 'Bot (Web)';
    rating.timestamp = new Date();
    const res = await FriendlyEatsData.addRating(restaurantID, rating);
    if (!res) {
      return Promise.reject();
    } else {
      ratings.push(rating);
    }
  }
  return ratings;
};
