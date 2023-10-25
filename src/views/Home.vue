<template>
  <div>
    <hero />
    <hr />
    <home-content />
    <TestAuth />
  </div>
</template>

<script lang="ts">
import Hero from "../components/Hero.vue";
import HomeContent from "../components/HomeContent.vue";
import TestAuth from "../components/TestAuth.vue";

export default {
  name: "home-view",
  components: {
    Hero,
    HomeContent,
    TestAuth
  },
};
</script>

<style lang="css" scoped>
.next-steps .fa-link {
    margin-right: 5px;
}
</style>
