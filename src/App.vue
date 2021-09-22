<template>
  <TheHeader />
  <router-view v-slot="slotProps" mode="out-in">
    <transition>
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>
<script>
import TheHeader from "@/components/layouts/TheHeader.vue";

export default {
  components: {
    TheHeader,
  },
  created() {
    this.$store.dispatch("tryLogin");
  },
  computed: {
    didLogout() {
      return this.$store.getters.didLogout;
    },
  },
  watch: {
    didLogout(currentval, oldval) {
      if (currentval && currentval !== oldval) {
        this.$router.replace("/coaches");
      }
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
}

.v-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.v-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.v-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.v-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.v-enter-active {
  transition: all 0.3s ease-out;
}
.v-leave-active {
  transition: all 0.3s ease-in;
}
</style>
