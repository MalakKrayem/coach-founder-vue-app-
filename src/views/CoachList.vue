<template>
  <div>
    <BaseDialog :show="!!error" title="An error eccurred!" @close="close">
      <p>{{ error }}</p>
    </BaseDialog>
    <section>
      <CoachFillter @change-filter="setFilters"></CoachFillter>
    </section>
    <section>
      <BaseCard>
        <div class="controls">
          <BaseButton mode="outline" @click="loadChoaches(true)"
            >Refresh</BaseButton
          >
          <base-button link to="/auth?redirect=register" v-if="!isLoggedin"
            >Login to rigester as a coatch</base-button
          >
          <BaseButton
            v-if="isLoggedin && !isCoach && !isLoading"
            link
            :to="{ name: 'register' }"
            >Register a coach</BaseButton
          >
        </div>
        <div v-if="isLoading">
          <BaseSpinner />
        </div>
        <ul v-else-if="hasCoaches">
          <CardItem
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :firstName="coach.firstName"
            :lastName="coach.lastName"
            :rate="coach.hourlyRate"
            :areas="coach.areas"
          />
        </ul>
        <h3 v-else>No coaches found</h3>
      </BaseCard>
    </section>
  </div>
</template>

<script>
import CardItem from "@/components/coaches/CardItem.vue";
import BaseCard from "../components/ui/BaseCard.vue";
import BaseButton from "../components/ui/BaseButton.vue";
import BaseSpinner from "../components/ui/BaseSpinner.vue";
import CoachFillter from "../components/coaches/CoachFillter.vue";
import BaseDialog from "../components/ui/BaseDialog.vue";
export default {
  components: {
    CardItem,
    BaseCard,
    BaseButton,
    CoachFillter,
    BaseSpinner,
    BaseDialog,
  },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    isLoggedin() {
      return this.$store.getters.isAuthenticated;
    },
    filteredCoaches() {
      const coaches = this.$store.getters["coach/coaches"];
      return coaches.filter((coach) => {
        if (this.activeFilters.frontend && coach.areas.includes("frontend")) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes("backend")) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes("career")) {
          return true;
        }
        return false;
      });
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters["coach/hasCoaches"];
    },
    isCoach() {
      return this.$store.getters["coach/isCoach"];
    },
  },
  created() {
    this.loadChoaches();
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async loadChoaches(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch("coach/loadChoaches", {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
      this.isLoading = false;
    },
    close() {
      this.error = null;
    },
  },
};
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
