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
      <modal v-if="showModal" @close="showModal = false">
        <h3 slot="header">Error</h3>
        <div slot="body">
	  <div v-if="errorType==1">
             No firebase config.<br />
	     Setup Firebase and update src/firebase/firebase.js<br />
	  </div>
	  <div v-if="errorType==2">
             Enable Anonymous Auth on Firebase Authentication console.
	  </div>
	  <div v-if="errorType==99">
             {{this.errorMessage}}
	  </div>
        </div>
      </modal>
    </v-content>
  </v-app>
</template>

<script>
import firebase from 'firebase/app' 
import "firebase/auth"
import "firebase/firestore"

import modal from '@/components/modal'

import firebaseConfig from '@/firebase/firebase';

export default {
  name: 'App',
  components: {
    modal,
  },
  data () {
    return {
      navBar: false,
      showModal: false,
      errorType: null,
      errorMessage: "",
    }
  },
  async created() {
    if (Object.keys(firebaseConfig).length === 0) {
      this.setError(1);
      return ;
    }
    firebase.initializeApp(firebaseConfig);

    try {
      const user = await firebase.auth().signInAnonymously();
      console.log(user);
    } catch (e) {
      if (e.code === "auth/admin-restricted-operation") {
        this.setError(2);
      } else if(e.code === "auth/internal-error") {
        try {
          const message = JSON.parse(e.message)
          this.setError(99, message.error.message);
        } catch (e) {
          this.setError(99, "invalid api key or not set Anonymous user on Firebase Authentication.");
        }
      } else {
        this.setError(99, "invalid api key or not set Anonymous user on Firebase Authentication.");
      }
    }
  },
  computed: {
  },
  methods: {
    updateNaviBar: function() {
      this.navBar =  !this.navBar;
    },
    setError: function(type, message=null) {
      this.showModal = true;
      this.errorType = type;
      this.errorMessage = message;
    },
  },
}
</script>

<style>
  p {
  margin-bottom: 2px;
  }
</style>
