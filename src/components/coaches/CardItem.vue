<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>${{ rate }}/hour</h4>
    <div>
      <BaseBadge :title="area" :type="area" v-for="area in areas" :key="area" />
    </div>
    <div class="actions">
      <BaseButton
        mode="outline"
        link
        :to="{ name: 'contact', params: { id: this.id } }"
        >Contact</BaseButton
      >
      <BaseButton link :to="{ name: 'coach', params: { id: this.id } }"
        >View Details</BaseButton
      >
    </div>
  </li>
</template>

<script>
import BaseButton from "../ui/BaseButton.vue";
import BaseBadge from "../ui/BaseBadge.vue";

export default {
  components: {
    BaseButton,
    BaseBadge,
  },
  props: ["id", "firstName", "lastName", "rate", "areas"],
  computed: {
    fullName() {
      return this.firstName + " " + this.lastName;
    },
  },
};
</script>

<style lang="scss" scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
