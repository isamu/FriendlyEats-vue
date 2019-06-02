<template>
  <div>
    Protected
  </div>
</template>

<script>
export default {
  name: 'Protected',

  computed: {
    logined() {
      return !!this.$store.getters.getUser;
    },
  },
  mounted() {
    if (!this.logined) {
      this.$router.push({name: "signin"})
    }
  }
}
</script>
