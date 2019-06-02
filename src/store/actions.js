import firebase from 'firebase/app';

export const setUser = ({ commit }) => {
  firebase.auth().onAuthStateChanged(
    (user) => {
      commit('setUser', user);
    }
  );
};
