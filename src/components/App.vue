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
        <span>Firebase</span>
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
  created() {
    firebase.initializeApp(firebaseConfig);
    firebase.auth().signInAnonymously();
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
