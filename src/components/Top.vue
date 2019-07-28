<template>
<v-layout row wrap>
  <v-flex xs2>
    <vSelect v-model="city" :options="cityOptions" placeholder="都道府県"></vSelect>
  </v-flex>
  <v-flex xs2>
    <vSelect v-model="category" :options="categoryOptions" placeholder="カテゴリー"></vSelect>
  </v-flex>
  <v-flex xs2>
    <vSelect  v-model="price" :options="priceOptions" placeholder="金額" ></vSelect>
  </v-flex>
  <v-flex xs2>
    <vSelect v-model="sortOrder" :options="sortOrderOptions" placeholder="順"></vSelect>
  </v-flex>
  <v-flex xs2>
    <v-btn color="success" @click="filterData" >Filter Data</v-btn> 
  </v-flex>
  <v-flex xs2>
  </v-flex>
  <template v-if="restaurants.length === 0">
    <v-flex xs2 />
    <v-flex xs8>
      <div id="guy-container" class="mdc-toolbar-fixed-adjust">
        <img class="guy" src="/img/guy_fireats.png" />
        <div class="text">
          This app is connected to the Firebase project "<b>{{appData.projectId}}</b>".<br />
          <br />
          Your Cloud Firestore has no documents in <b>/restaurants/</b>.
        </div>
        <br />
        <v-btn color="success" @click="importData" >Import Data</v-btn>
      </div>
    </v-flex>
    <v-flex xs4 />
  </template>
  <v-flex xs4 v-for="restaurant in restaurants" :key="restaurant.id">
    <v-card @click="link(restaurant.id)">
      <img :src="restaurant.photo" /><br/>
      {{restaurant.name}}<br/>
      {{restaurant.city}}
    </v-card>
  </v-flex>
</v-layout>
</template>

<script>
import * as FriendlyEats from '@/components/FriendlyEats'
import * as FriendlyEatsData from '@/components/FriendlyEats.Data'
import * as FriendlyEatsMock from '@/components/FriendlyEats.Mock'
import * as firebase from 'firebase/app' 

import vSelect from 'vue-select'

export default {
  name: 'Top',
  components: {vSelect},
  data() {
    return {
      restaurants: [],
      detacher: null,
      appData: {},
      categoryOptions: FriendlyEats.data.categories,
      category: null,
      cityOptions: FriendlyEats.data.cities,
      city: null,
      priceOptions: [ "$", "$$", "$$$", "$$$$"],
      price: null,
      sortOrderOptions: ['Rating', 'Reviews'],
      sortOrder: null,
    };
  },
  methods: {
    importData: function() {
      FriendlyEatsMock.addMockRestaurants();
    },
    filterData: function() {
      const filters = {
        city: this.city || "Any",
        category: this.category || "Any",
        price: this.price || "Any",
        sortOrder: this.sortOrder,
      }
      if (this.detacher) {
        this.detacher();
      }
      this.getFilteredRestaurants(filters);
      console.log(filters);
    },
    link: function(id) {
      this.$router.push({ name: 'restaurant', params: { id } })
    },
    watchData: function(data) {
      this.detacher = data.onSnapshot((snapshot) => {
        this.restaurants = [];
        snapshot.forEach((doc) => {
          const restaurant = doc.data();
          restaurant.id = doc.id;
          this.restaurants.push(restaurant);
        });
      });
    },
    getAllRestaurants: function() {
      const data = FriendlyEatsData.getAllRestaurants();
      if (data) {
        this.watchData(data);
      }
    },
    getFilteredRestaurants: function(filters) {
      const data = FriendlyEatsData.getFilteredRestaurants(filters);
      if (data) {
        this.watchData(data);
      } else {
        alert("getFilteredRestaurants is not implemented yet!")
      }
    }
  },
  created() {
    this.appData = firebase.app().options;
    this.getAllRestaurants();
  },
  destroyed() {
    if (this.detacher) {
      this.detacher();
    }
  },  
}
</script>

<style>
 #guy-container {padding-top: 100px; text-align: center;}
 
 #guy-container .mdc-button {background-color: #ccc;}
 
 .guy {
   max-width: 200px;
   margin-bottom: 20px;
 }
 .vs__dropdown-menu {
 position: absolute;
 z-index: 100;
 background: white;
 width: 100%;
 border: 2px solid #000000;
 }
</style>  
