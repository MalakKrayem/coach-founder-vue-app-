<template>
  <div>
    <section>
      <BaseCard>
        <h2>Register as a coach now!</h2>
        <CoachForm @save-data="save" />
      </BaseCard>
    </section>
  </div>
</template>

<script>
import CoachForm from "../components/coaches/CoachForm.vue";
import BaseCard from "../components/ui/BaseCard.vue";

export default {
  components: {
    CoachForm,
    BaseCard,
  },

  methods: {
    save(formData) {
      this.$store.dispatch("coach/addCoach", formData);
      this.$router.replace("/coaches");
    },
  },
};
</script>

<style lang="scss" scoped></style>
