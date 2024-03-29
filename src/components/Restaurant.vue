<template>
<v-layout row wrap>
  <template v-if="restaurant">
    <v-flex xs12 :style="{ backgroundImage: 'url(' + restaurant.photo + ')'}" class="imageHeader">
      <h2>{{restaurant.name}}</h2>
      <v-icon v-for="star in getStar(restaurant.avgRating)" v-bind:key="star.id" :style="{'color': '#fff'}">{{star.value}}</v-icon><br/>
      {{restaurant.city}} / {{restaurant.category}}<br/>
      <div class="iconBox">
        <v-icon class="iconHover" @click="showModal = true">add_circle</v-icon>
      </div>
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
          <div :style="{marginBottom: '10px'}">
            <span class="ratingStar">
              <v-icon v-for="star in getStar(rating.rating)" v-bind:key="star.id" color="#feb22c">{{star.value}}</v-icon><br/>
            </span>
            <span :style="{color: '#999'}">{{rating.userName}}</span>
          </div>
          {{rating.text}}
        </v-flex>
        <v-flex xs2 v-bind:key="rating.id + 'c'"/>
      </template>
    </template>
    <modal v-if="showModal" @close="showModal = false">
      <h3 slot="header">Add a Review</h3>
      <div slot="body">
        <div :style="{ borderBottom: '1px solid', paddingBottom: '20px', textAlign: 'center'}">
          <v-icon v-for="star in getStar(selectedRating)" v-bind:key="star.id" v-on:mouseenter="changeRating(star)">
            {{star.value}}
          </v-icon>
        </div>
        <div :style="{ borderBottom: '1px solid'}">
          <textarea v-model="message" class="textarea">
          </textarea>
          </div>
      </div>
      <div slot="footer">
        <v-btn class="modal-default-button" @click="showModal = false">
          CANCEL
        </v-btn>
        <v-btn class="modal-default-button" @click="saveRating();">
          SAVE
        </v-btn>
      </div>
    </modal>
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
import * as FriendlyEatsData from '@/components/FriendlyEats.Data';
import * as FriendlyEatsMock from '@/components/FriendlyEats.Mock';
import modal from '@/components/modal';

import firebase from 'firebase/app';
import "firebase/auth";

export default {
  name: 'Top',
  components: {
    modal,
  },
  data() {
    return {
      restaurant: null,
      ratings: [],
      selectedRating: 5,
      showModal: false,
      message: "",
    };
  },
  methods: {
    AddRating: async function() {
      const id = this.$route.params.id;
      try {
        await FriendlyEatsMock.addMockRatings(id);
      } catch (e) {
        this.$eventHub.$emit('openModal', {
          type: 'restaurant.addRating',
        });
      }
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
    changeRating: function(rating) {
      this.selectedRating = rating.id + 1;
    },
    saveRating: async function() {
      const id = this.$route.params.id;
      const res = await FriendlyEatsData.addRating(id, {
        rating: this.selectedRating,
        text: this.message,
        userName: 'Anonymous (Web)',
        timestamp: new Date(),
        userId: firebase.auth().currentUser.uid
      });
      this.message = "";
      this.selectedRating = 5;
      this.showModal = false;

      if (!res) {
        this.$eventHub.$emit('openModal', {
          type: 'restaurant.addRating',
        });
      }
      
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
.imageHeader {
    background-repeat: repeat;
    width: 100%;
    color: #fff;
    text-align: center;
    font-size: 1.5em;
    margin-bottom: 30px;
}
.imageHeader h2 {
    margin-top: 10px;
    font-size: 2em;
}
.ratingBox {
    margin-top: 10px;
    padding-bottom: 16px;
    border-bottom: 1px solid;

}
.ratingStar {
    float: right;
    color: #feb22c;
}
.iconBox {
    width: 60%;
    margin: auto;
}
.iconHover {
    float: right;
    margin: 0px;
    position: relative;
    top: 23px;
    margin-right: 10px;
    align-self: flex-end;
    color: gold;
    font-size: 46px;
}
.iconHover:hover {
    color: orange;
}
.textarea {
    width: 100%;
    box-sizing: border-box;
    height: 100px;
    resize: none;
    border-width: 1px 0px 1px 0px;
    padding: 10px;
}

</style>
