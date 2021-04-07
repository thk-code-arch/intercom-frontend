
<template>
  <div>
    <div class="p-8">
      <!-- TEXT -->
      <FormulateForm
        @submit="changePasswordNow"
        v-model="password"
        :schema="changePassword"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "change-password",
  data: function () {
    return {
      password: {},
      changePassword: [
        {
          label: "New password",
          name: "password",
          type: "password",
          validation: "required",
        },
        {
          label: "Confirm password",
          type: "password",
          name: "Passwords",
          validation: "required|confirm",
        },
        {
          type: "submit",
          label: "Update Password",
        },
      ],
    };
  },
  computed: {},
  components: {},

  methods: {
    changePasswordNow() {
    },
  },
  mounted() {},
};
</script>
