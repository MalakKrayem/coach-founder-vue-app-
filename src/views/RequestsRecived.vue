<template>
  <div>
    <BaseDialog :show="!!error" title="An error eccurred!" @close="close">
      <p>{{ error }}</p>
    </BaseDialog>
    <section>
      <BaseCard>
        <header>
          <h2>Requests Recieved</h2>
        </header>
        <BaseSpinner v-if="isLoading" />
        <ul v-else-if="hasRequest && !this.isLoading">
          <RequestItem
            v-for="request in requests"
            :key="request.id"
            :email="request.email"
            :message="request.message"
          />
        </ul>
        <h3 v-else>You haven't recieved any requests yet!</h3>
      </BaseCard>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BaseCard from "../components/ui/BaseCard.vue";
import RequestItem from "../components/requests/RequestItem.vue";
import BaseSpinner from "../components/ui/BaseSpinner.vue";
import BaseDialog from "../components/ui/BaseDialog.vue";

export default {
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  components: {
    BaseCard,
    RequestItem,
    BaseSpinner,
    BaseDialog,
  },
  computed: {
    ...mapGetters("request", ["requests", "hasRequest"]),
  },
  created() {
    this.setRequests();
  },
  methods: {
    async setRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("request/setRequests");
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
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
