<template>
  <div class="w-full px-6 mx-auto sm:px-8">
    <div class="py-8">
      <div>
        <h2 class="text-2xl font-semibold leading-tight">Users</h2>
      </div>
      <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
        <div class="inline-block min-w-full overflow-hidden rounded-lg">
          <table class="min-w-full leading-normal">
            <thead>
              <tr>
                <th
                  class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                >
                  Username
                </th>
                <th
                  class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                >
                  email
                </th>
                <th
                  class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                >
                  Created at
                </th>
                <th
                  class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                >
                  Roles
                </th>
                <th
                  class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                >
                  Assigned Projects
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(usr, usr_index) in Users" :key="usr_index">
                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 w-10 h-10">
                      <img
                        class="w-full h-full rounded-full"
                        :src="$profile_image + usr.profile_image"
                        alt=""
                      />
                    </div>
                    <div class="ml-3">
                      <p class="text-gray-900 whitespace-no-wrap">
                        {{ usr.username }}
                      </p>
                    </div>
                  </div>
                </td>
                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{ usr.email }}
                  </p>
                </td>
                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{ usr.createdAt | formatDate }}
                  </p>
                </td>
                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                  <div v-for="(arole, arole_idx) in usr.roles" :key="arole_idx">
                    <span
                      v-on:click="rmRole(arole.name, usr.id)"
                      class="relative inline-block px-3 py-1 leading-tight cursor-pointer"
                    >
                      <span
                        aria-hidden
                        class="absolute inset-0 bg-gray-200 rounded-full opacity-50"
                      ></span>
                      <span class="relative">{{ arole.name }}</span>
                    </span>
                    <span
                      v-on:click="addRole(arole.name, usr.id)"
                      v-if="arole.name !== 'admin'"
                      class="relative inline-block px-3 py-1 leading-tight cursor-pointer"
                    >
                      <span
                        aria-hidden
                        class="absolute inset-0 bg-gray-200 rounded-full opacity-50"
                      ></span>
                      <span class="relative">+</span>
                    </span>
                  </div>
                </td>
                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                  <span
                    v-for="(aproj, aproj_idx) in usr.projects"
                    :key="aproj_idx"
                    class="relative inline-block px-3 py-1 leading-tight"
                  >
                    <span
                      aria-hidden
                      class="absolute inset-0 bg-gray-200 rounded-full opacity-50"
                    ></span>
                    <span class="relative">{{ aproj.name }}</span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="py-8">
      <div>
        <h2 class="text-2xl font-semibold leading-tight">Projects</h2>
      </div>
      <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
        <div class="inline-block min-w-full overflow-hidden rounded-lg">
          <table class="min-w-full leading-normal">
            <thead>
              <tr>
                <th
                  class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                >
                  Name
                </th>
                <th
                  class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                >
                  Description
                </th>
                <th
                  class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                >
                  CreatedAt
                </th>
                <th
                  class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                >
                  Project Owner
                </th>
                <th
                  class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                >
                  Assigned Users
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(project, project_idx) in Projects" :key="project_idx">
                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{ project.name }}
                  </p>
                </td>
                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{ project.description }}
                  </p>
                </td>
                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{ project.createdAt | formatDate }}
                  </p>
                </td>
                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{ project.owner }}
                  </p>
                </td>
                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                  <span
                    v-for="(auser, auser_idx) in project.users"
                    :key="auser_idx"
                    class="relative inline-block px-3 py-1 leading-tight"
                  >
                    <span
                      aria-hidden
                      class="absolute inset-0 bg-gray-200 rounded-full opacity-50"
                    ></span>
                    <span class="relative">{{ auser.username }}</span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="py-8">
      <div>
        <h2 class="text-2xl font-semibold leading-tight">Chatrooms</h2>
      </div>
      <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
        <div class="inline-block min-w-full overflow-hidden rounded-lg">
          <table class="min-w-full leading-normal">
            <thead>
              <tr>
                <th
                  class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                >
                  Name
                </th>
                <th
                  class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                >
                  Description
                </th>
                <th
                  class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                >
                  Created at
                </th>
                <th
                  class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                >
                  Roomtype
                </th>
                <th
                  class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                >
                  Assigned Users
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(room, room_idx) in Chatrooms" :key="room_idx">
                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{ room.name }}
                  </p>
                </td>
                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{ room.description }}
                  </p>
                </td>
                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{ room.createdAt | formatDate }}
                  </p>
                </td>
                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{ room.roomtype }}
                  </p>
                </td>
                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                  <span
                    v-for="(cuser, cuser_idx) in room.users"
                    :key="cuser_idx"
                    class="relative inline-block px-3 py-1 leading-tight"
                  >
                    <span
                      aria-hidden
                      class="absolute inset-0 bg-gray-200 rounded-full opacity-50"
                    ></span>
                    <span class="relative">{{ cuser.username }}</span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import moment from "moment";
Vue.filter("formatDate", function (value) {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY HH:mm");
  }
});
import AdminService from "@/services/admin.service";
export default {
  name: "Admin",
  components: {},
  data() {
    return {
      Users: [],
      Projects: [],
      Chatrooms: [],
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    rmRole(therole, theuserid) {
      if (therole === "admin" && theuserid != this.currentUser.id) {
        AdminService.rmRole(therole, theuserid).then(
          (response) => {
            this.Users = response.data;
          },
          (error) => {
            this.content =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
          }
        );
      }
    },
    addRole(therole, theuserid) {
      if (therole === "user") {
        AdminService.addRole("admin", theuserid).then(
          (response) => {
            this.Users = response.data;
          },
          (error) => {
            this.content =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
          }
        );
      }
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }

    this.$http.get("admin/get_users").then(
      (response) => {
        this.Users = response.data;
      },
      (error) => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
    this.$http.get("admin/get_projects").then(
      (response) => {
        this.Projects = response.data;
      },
      (error) => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
    this.$http.get("admin/get_chatrooms").then(
      (response) => {
        this.Chatrooms = response.data;
      },
      (error) => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>
