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
  <v-flex xs4 v-for="restaurant in restaurants" :key="restaurant.id" align-content-center=true>
    <v-card @click="link(restaurant.id)" max-width="80%" :style="{'margin': 'auto'}">
      <img :src="restaurant.photo" :style="{ 'width': '100%'}"/><br/>
      <span v-for="price in getPrice(restaurant.price)" :style="{ 'position': 'relative', 'float': 'right'}">{{price.value}}</span>
      <h2>{{restaurant.name}}</h2>
      <v-icon v-for="star in getStar(restaurant.avgRating)" v-bind:key="star.id" :style="{'color': '#feb22c'}">{{star.value}}</v-icon><br/>
      {{restaurant.city}}
      ●
      {{restaurant.category}}
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
    importData: async function() {
      try {
        await FriendlyEatsMock.addMockRestaurants();
      } catch (e) {
        this.$eventHub.$emit('openModal', {
          type: 'top.addRestaurant',
        });
      }
    },
    getPrice: function(price) {
      const ret = [];
      for (let r = 0; r < price; r += 1) {
        ret.push({id: r, value: "$"});
      }
      return ret;
    },
    getStar: function(rating) {
      const ret = [];
      for (let r = 0; r < 5; r += 1) {
        if (r < Math.floor(rating)) {
          ret.push({id: r, value: "star"});
        } else {
          ret.push({id: r, value: "star_border"});
        }
      }
      return ret;
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
    },
    link: function(id) {
      this.$router.push({ name: 'restaurant', params: { id } })
    },
    renderer: function() {
      return {
        remove: (doc) => {
          this.restaurants.filter(n => n.id !== doc.id);
        },
        display: (doc) => {
          const data = doc.data();
          data.id = doc.id;

          const index = this.restaurants.findIndex((element) => { return element.id === doc.id });
          if (index !== -1) {
            this.restaurants[index] = data;
          } else {
            this.restaurants.push(data);
          }
        },
        empty: () => {
          this.restaurants = [];
        },
      }
    },
    watchData: function(query) {
      this.detacher = FriendlyEatsData.getDocumentsInQuery(query, this.renderer());
    },
    getAllRestaurants: function() {
      const query = FriendlyEatsData.getAllRestaurants();
      if (query) {
        this.watchData(query);
      }
    },
    getFilteredRestaurants: function(filters) {
      const query = FriendlyEatsData.getFilteredRestaurants(filters);
      if (query) {
        this.watchData(query);
      } else {
        this.$eventHub.$emit('openModal', {
          type: 'top.getFilteredRestaurants',
        });
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
