<template>
<v-layout row wrap>
  <template v-if="restaurant">
    <v-flex xs12>
      <img :src="restaurant.photo" class="image_head"/><br/>
      {{restaurant.name}}<br/>
      {{restaurant.city}}<br/>
      <template v-if="ratings.length === 0">
        <div id="guy-container" class="mdc-toolbar-fixed-adjust">
          <img class="guy" src="/img/guy_fireats.png" />
          <div class="text">
            This restaurant has no ratings.<br />
          </div>
          <br />
          <v-btn color="success" @click="AddRating" >Add Rating</v-btn>
        </div>
      </template>
      <template v-else>
        <template xs12 v-for="rating in ratings">
          {{rating.rating}} / {{rating.text}} / {{rating.userName}}<br/>
        </template>
      </template>
    </v-flex>
  </template>
  <template v-else>
    <v-flex xs12>
      <div id="guy-container" class="mdc-toolbar-fixed-adjust">
        <img class="guy" src="/img/guy_fireats.png" />
        <div class="text">
          No restaurant data.<br />
          Implement getRestaurant.
        </div>
        <br />
      </div>
    </v-flex>
  </template>
</v-layout>
</template>

<script>
import * as FriendlyEatsData from '@/components/FriendlyEats.Data'
import * as FriendlyEatsMock from '@/components/FriendlyEats.Mock'

export default {
  name: 'Top',
  data() {
    return {
      restaurant: null,
      ratings: [],
    };
  },
  methods: {
    AddRating: async function() {
      const id = this.$route.params.id;
      await FriendlyEatsMock.addMockRatings(id);
    }
  },
  async created() {
    const id = this.$route.params.id;
    const restaurant = await FriendlyEatsData.getRestaurant(id);
    if (restaurant && restaurant.exists) {
      this.restaurant = restaurant.data();

      const data =  await FriendlyEatsData.getRating(id);
      this.detacher = data.onSnapshot((snapshot) => {
        this.ratings = [];
        snapshot.forEach((doc) => {
          const rating = doc.data();
          rating.id = doc.id;
          this.ratings.push(rating);
        });
      });
    }
  },
  destroyed() {
    if (this.detacher) {
      this.detacher();
    }
  },  
}
</script>

<style scoped>
.image_head {
width: 100%;
height: 40%;
object-fit: cover;
}
</style>
