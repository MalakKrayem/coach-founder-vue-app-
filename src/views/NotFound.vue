<template>
  <div>
    <section>
      <BaseCard>
        <h2>Page not found</h2>
        <p>
          This page could not be found - maybe check out all our
          <strong>
            <router-link :to="{ name: 'coaches' }">Coaches</router-link></strong
          >
        </p>
      </BaseCard>
    </section>
  </div>
</template>

<script>
import BaseCard from "../components/ui/BaseCard.vue";
export default {
  components: {
    BaseCard,
  },
};
</script>

<style lang="scss" scoped>
section {
  text-align: center;
  vertical-align: center;
}
</style>
