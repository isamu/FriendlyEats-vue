import * as firebase from "firebase/app"
import "firebase/firestore";

export const addRestaurant = (data) => {
  /*
    TODO: Implement adding a document
  */
};

export const getAllRestaurants = () => {
  /*
    TODO: Retrieve list of restaurants
  */
};

export const getDocumentsInQuery = (query, renderer) => {
  /*
    TODO: Render all documents in the provided query
  */
};

export const getRestaurant = (id) => {
  /*
    TODO: Retrieve a single restaurant
  */
};

export const getFilteredRestaurants = (filters) => {
  /*
    TODO: Retrieve filtered list of restaurants
  */
};

export const addRating = (restaurantID, rating) => {
  /*
    TODO: Retrieve add a rating to a restaurant
  */
};

export const getRating = (id) => {
  return firebase.firestore().collection('restaurants').doc(id).collection('ratings').orderBy('timestamp', 'desc');
}
