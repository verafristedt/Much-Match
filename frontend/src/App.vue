<template>
  <v-app>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "App",
  watch: {
    $route: {
      handler: (to, from) => {
        document.title =
          to.meta.title ||
          "MuchMatch: Swiping Behaviour Study [EPFL Experience Design]";
      },
      immediate: true
    }
  }
});
</script>