<template>
  <div>
    <h2>Protected</h2>
  </div>
</template>

<script>
export default {
  name: 'protected',

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
