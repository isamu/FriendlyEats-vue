<template>
<v-layout row wrap>
  <template v-if="restaurant">
    <v-flex xs12 :style="{ backgroundImage: 'url(' + restaurant.photo + ')'}" class="imageHeader">
      <h2>{{restaurant.name}}</h2>
      <v-icon v-for="star in getStar(restaurant.avgRating)" v-bind:key="star.id" :style="{'color': '#fff'}">{{star.value}}</v-icon><br/>
      {{restaurant.city}} / {{restaurant.category}}<br/>
    </v-flex>

    <template v-if="ratings.length === 0">
      <v-flex xs12>
        <div id="guy-container" class="mdc-toolbar-fixed-adjust">
          <img class="guy" src="/img/guy_fireats.png" />
          <div class="text">
            This restaurant has no ratings.<br />
          </div>
          <br />
          <v-btn color="success" @click="AddRating" >Add Rating</v-btn>
        </div>
      </v-flex>
    </template>
    <template v-else>
      <template v-for="rating in ratings">
        <v-flex xs2 v-bind:key="rating.id + 'a'" />
        <v-flex xs8 class="ratingBox" v-bind:key="rating.id + 'b'">
          <span class="ratingStar">
            <v-icon v-for="star in getStar(rating.rating)" v-bind:key="star.id">{{star.value}}</v-icon><br/>
          </span>
          <span style="{color: '#999'}">{{rating.userName}}</span><br/>
          {{rating.text}}
        </v-flex>
        <v-flex xs2 v-bind:key="rating.id + 'c'"/>
      </template>
    </template>
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
.imageHeader {
    background-repeat: repeat;
    width: 100%;
    color: #fff;
    text-align: center;
    font-size: 1.5em;
}
.imageHeader h2 {
    margin-top: 10px;
    font-size: 2em;
}
.ratingBox {
    margin-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid;
}
.ratingStar {
    float: right;
    color: #feb22c;
}
</style>
