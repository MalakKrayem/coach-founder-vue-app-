<template>
  <div>
    <section>
      <BaseCard>
        <h2>{{ fullName }}</h2>
        <h3>${{ rate }}/hour</h3>
      </BaseCard>
    </section>
    <section>
      <BaseCard>
        <header>
          <h2>Interested? Reach out now!</h2>
          <BaseButton link :to="{ name: 'contact', params: { id: this.id } }"
            >Contact</BaseButton
          >
        </header>
        <router-view></router-view>
      </BaseCard>
    </section>
    <section>
      <BaseCard>
        <div>
          <BaseBadge
            v-for="area in areas"
            :key="area"
            :type="area"
            :title="area"
          />
        </div>
        <p>{{ description }}</p>
      </BaseCard>
    </section>
  </div>
</template>

<script>
import BaseCard from "../components/ui/BaseCard.vue";
import BaseButton from "../components/ui/BaseButton.vue";
import BaseBadge from "../components/ui/BaseBadge.vue";

export default {
  props: ["id"],
  components: {
    BaseCard,
    BaseButton,
    BaseBadge,
  },
  data() {
    return {
      selectedCoach: null,
    };
  },
  computed: {
    fullName() {
      return this.selectedCoach.firstName + " " + this.selectedCoach.lastName;
    },
    rate() {
      return this.selectedCoach.hourlyRate;
    },
    areas() {
      return this.selectedCoach.areas;
    },
    description() {
      return this.selectedCoach.description;
    },
  },
  created() {
    this.selectedCoach = this.$store.getters["coach/coaches"].find(
      (coach) => coach.id === this.id
    );
  },
};
</script>

<style lang="scss" scoped></style>
