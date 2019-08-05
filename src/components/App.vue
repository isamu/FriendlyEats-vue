<template>
  <v-app>
    <v-navigation-drawer fixed clipped app v-model="navBar">
      <v-list dense class="pt-0">
        <router-link to="/">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>dashboard</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Top</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app>
      <v-toolbar-side-icon @click.stop="updateNaviBar"></v-toolbar-side-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span>FriendlyEats</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat><router-link to="/">Top</router-link></v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import firebase from 'firebase/app' 
import "firebase/auth"
import "firebase/firestore"

import firebaseConfig from '@/firebase/firebase';

export default {
  name: 'App',
  data () {
    return {
      navBar: false,
    }
  },
  async created() {
    if (Object.keys(firebaseConfig).length === 0) {
      alert("No firebase config. Setup Firebase and update src/firebase/firebase.js")
      return ;
    }
    firebase.initializeApp(firebaseConfig);

    try {
      const user = await firebase.auth().signInAnonymously();
      console.log(user);
    } catch (e) {
      if (e.code === "auth/admin-restricted-operation") {
        alert("Enable Anonymous Auth on Firebase Authentication console.");
      } else if(e.code === "auth/internal-error") {
        try {
          const message = JSON.parse(e.message)
          alert(message.error.message);
        } catch (e) {
          alert("invalid api key or not set Anonymous user on Firebase Authentication.");
        }
      } else {
        alert("invalid api key or not set Anonymous user on Firebase Authentication.");
      }
    }
  },
  computed: {
  },
  methods: {
    updateNaviBar: function() {
      this.navBar =  !this.navBar;
    },
  },
}
</script>

<style>
  p {
  margin-bottom: 2px;
  }
</style>
