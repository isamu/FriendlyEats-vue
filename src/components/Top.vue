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
import * as FriendlyEatsData from '@/components/FriendlyEats.Data'

export default {
  name: 'Top',
  data() {
    const data = FriendlyEatsData.getAllRestaurants();
    return {
      restaurants: data,
    };
  },
}
</script>
