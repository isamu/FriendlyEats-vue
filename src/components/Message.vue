<template>
<div>
  <div>
    <h2>Test for firestore</h2>
    <v-text-field  v-model="form_message" box></v-text-field>
    <v-btn @click="update" color="success">update</v-btn>
  </div>
  <div>
    <ul>
      <li v-for="message in messages" :key="message.id">
        {{ message.message }}
      </li>
    </ul>
  </div>
</div>
  
</template>

<script>
import firebase from "firebase/app"
import "firebase/firestore";

const FieldValue = firebase.firestore.FieldValue;

export default {
  name: 'Message',
  data() {
    return {
      db: null,
      messages: [],
      form_message: "",
      detacher: null,
    }
  },
  methods: {
    update: function() {
      const refMessage = this.db.collection("message");
      refMessage.add({
        message: this.form_message,
        created: FieldValue.serverTimestamp(),
      });
      this.form_message = "";
    }
  },
  created() {
    this.db = firebase.firestore();
    const refMessage = this.db.collection("message");
    this.detacher = refMessage.orderBy("created", "desc").onSnapshot((snapshot) => {
      this.messages = [];
      snapshot.forEach((doc) => {
        const message = doc.data();
        message.id = doc.id;
        this.messages.push(message);
      });
    });
  },
  destroyed() {
    if (this.detacher) {
      this.detacher();
    }
  },
}
</script>
