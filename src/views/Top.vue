<template>
<v-layout  row wrap>
  <v-flex xs4 v-for="(restaurant, index) in restaurants" :key="index">
    <v-card>
      <img :src="restaurant.photo" /><br/>
      {{restaurant.name}}<br/>
      {{restaurant.city}}
    </v-card>
  </v-flex>
  
</v-layout>
</template>

<script>
import * as restaurantData from '@/components/restaurantData'

export default {
  name: 'Top',
  data() {
    const restaurants = [];
    for(var i = 0; i < 20; i ++ ) {
      restaurants.push(this.rand());
    }

    return {
      restaurants
    };
  },
  methods: {
    rand: function() {
      return restaurantData.getRandomRestaurant();
    },
  }

}
</script>
