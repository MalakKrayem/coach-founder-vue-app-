<template>
  <div>
    <section>
      <BaseCard>
        <h2>Contact the Coach</h2>
        <form @submit.prevent="addRequest">
          <div class="form-control" :class="{ errors: !email.isValid }">
            <label for="email">Email Address</label>
            <input
              type="email"
              placeholder="example@a.com"
              v-model.trim="email.val"
              @blur="clearValidate('email')"
            />
            <p v-if="!email.isValid">Email must not be empty</p>
          </div>
          <div class="form-control" :class="{ errors: !message.isValid }">
            <label for="message">Message</label>
            <textarea
              name="message"
              id="message"
              rows="5"
              v-model.trim="message.val"
              @blur="clearValidate('email')"
            />
            <p v-if="!message.isValid">Email must not be empty</p>
          </div>
          <div class="actions">
            <p v-if="!validate">Please fill the empty field!</p>
            <BaseButton> Send</BaseButton>
          </div>
        </form>
      </BaseCard>
    </section>
  </div>
</template>

<script>
import BaseCard from "../components/ui/BaseCard.vue";
import BaseButton from "../components/ui/BaseButton.vue";

export default {
  components: {
    BaseCard,
    BaseButton,
  },
  data() {
    return {
      email: {
        val: "",
        isValid: true,
      },
      message: {
        val: "",
        isValid: true,
      },
      validate: true,
    };
  },
  methods: {
    formValidate() {
      this.validate = true;
      if (this.email.val === "" || !this.email.val.includes("@")) {
        this.email.isValid = false;
        this.validate = false;
      }
      if (this.message.val === "") {
        this.message.isValid = false;
        this.validate = false;
      }
    },
    clearValidate(input) {
      this[input].isValid = true;
    },
    addRequest() {
      this.formValidate();
      if (!this.validate) {
        return;
      }
      const newRequest = {
        id: new Date().toISOString,
        coachId: this.$route.params.id,
        email: this.email.val,
        message: this.message.val,
      };
      this.$store.dispatch("request/addRequest", newRequest);
      this.$router.replace("/requests");
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>
