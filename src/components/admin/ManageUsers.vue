<!-- // Copyright (c) 2021 Steffen Stein <mail@steffenstein.com> For LICENSE see docs/LICENSE -->

<template>
  <div>
    <div v-on:click="toggleModal()">+ Add users</div>
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center max-w-4xl overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
    >
      <div class="relative w-3/4 max-w-full">
        <!--content-->
        <div
          class="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none"
        >
          <!--header-->
          <div
            class="flex items-start justify-between p-2 border-b border-gray-300 border-solid rounded-t"
          >
            <p class="text-xl">Add users to project: {{ project.name }}</p>
            <button
              class="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none"
              v-on:click="toggleModal()"
            >
              <span
                class="block w-6 h-6 text-2xl text-black bg-transparent outline-none opacity-5 focus:outline-none"
              >
                ×
              </span>
            </button>
          </div>
          <!--body-->
          <FormulateForm
            @submit="submitNewUsers"
            v-model="selectedUsers"
            :schema="addUsersForm"
            class="p-6 flex flex-row justify-between"
          />
          <div class="relative flex-auto p-2">
            <p class="my-4 text-lg leading-relaxed text-gray-600"></p>
          </div>
          <!--footer-->
        </div>
      </div>
    </div>
    <div v-if="showModal" class="fixed inset-0 z-40 bg-black opacity-50"></div>
  </div>
</template>


<script>
export default {
  name: "ManageUsers",
  props: {
    project: Object,
    allUsers: Array,
  },

  data() {
    return {
      showModal: false,
      selectedUsers: { email: [], textUsers: "" },
      addUsersForm: [
        {
          label: "Select users",
          name: "email",
          type: "checkbox",
          options: {},
        },
        {
          label: "Add new Users by email in commaseperated list.",
          name: "textUsers",
          type: "textarea",
        },
        {
          type: "submit",
          label: "Add users",
        },
      ],
    };
  },
  computed: {
    usersNotInProject() {
      let usersInProject = this.project.users.map(({ id }) => id);

      return this.allUsers.filter((u) => !usersInProject.includes(u.id));
    },
  },
  updated() {
    this.addUsersForm[0].options = this.usersNotInProject.map(
      ({ email, username }) => ({
        label: username,
        value: email,
      })
    );
  },
  methods: {
    toggleModal() {
      this.$emit("getProjects");
      this.showModal = !this.showModal;
    },
    reqBody() {
      const req = new Object();
      if (this.selectedUsers.email.length > 0) {
        req.email = this.selectedUsers.email;
      }
      if (this.selectedUsers.textUsers !== "") {
        req.newUsers = this.selectedUsers.textUsers.split(",");
      }
      req.projectId = this.project.id;
      return req;
    },
    submitNewUsers() {
      this.$http.post("/admin/add_users_to_project", this.reqBody()).then(
        (response) => {
          this.toggleModal();
          this.$notify({
            title: "Success",
            text: response.data,
            group: "info",
          });
        },
        (error) => {
          this.$notify({
            title: "Ooops...",
            text:
              (error.response && error.response.data) ||
              error.message ||
              error.toString(),
            group: "error",
          });
        }
      );
    },
  },
};
</script>
