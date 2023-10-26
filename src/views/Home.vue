<template>
  <div>
    <hr />
    <TestAuth />
  </div>
</template>

<script lang="ts">
import Hero from "../components/Hero.vue";
import TestAuth from "../components/TestAuth.vue";

export default {
  name: "home-view",
  components: {
    Hero,
    TestAuth
  },
};
</script>

<style lang="css" scoped>
.next-steps .fa-link {
    margin-right: 5px;
}
</style>
