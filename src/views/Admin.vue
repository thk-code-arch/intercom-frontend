<template>
  <div class="px-4">
    <div class="max-w-6xl p-8 mx-auto my-8 bg-white rounded-lg">
        <!-- Top bar -->
        <div class="flex items-center flex-none px-6 py-2 mb-4 border-b">
            <div class="flex flex-col">
                <h1 class="mb-2 text-2xl font-medium">Admin Dashboard</h1>
                <div class="text-sm truncate text-grey-dark">
                  Admin section
               </div>
            </div>
        </div>
        <!-- TEXT -->

  <div class="p-8">
<h2 class="mb-2 text-2xl font-medium">User List</h2>
<table class="table-auto">
  <thead>
    <tr>
      <th class="px-4 py-2">
        <svg viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6 user"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
      </th>
      <th class="px-4 py-2">id</th>
      <th class="px-4 py-2">Username</th>
      <th class="px-4 py-2">email</th>
      <th class="px-4 py-2">Roles</th>
      <th class="px-4 py-2">Assigned Projects</th>
    </tr>
  </thead>
  <tbody v-for="(usr, usr_index) in Users" :key="usr_index">
    <tr>
      <td class="px-4 py-2 border">
        <img :src="$profile_image+usr.profile_image" class="w-10 h-10 mr-3 rounded">
      </td>
      <td class="px-4 py-2 border">{{usr.id}}</td>
      <td class="px-4 py-2 border">{{usr.username}}</td>
      <td class="px-4 py-2 border">{{usr.email}}</td>
      <td class="px-4 py-2 border">
        <span v-for="(arole, arole_idx) in usr.roles" :key="arole_idx">{{arole.name}}</span>
      </td>
      <td class="px-4 py-2 border">
        <span v-for="(aproj, aproj_idx) in usr.projects" :key="aproj_idx"> ({{aproj.name}})</span>
      </td>
    </tr>
  </tbody>
</table>

<h2 class="mb-2 text-2xl font-medium">Project List</h2>
<table class="table-auto">
  <thead>
    <tr>
      <th class="px-4 py-2">Name</th>
      <th class="px-4 py-2">Description</th>
      <th class="px-4 py-2">Project Owner</th>
      <th class="px-4 py-2">Assigned Users</th>
    </tr>
  </thead>
  <tbody v-for="(project, project_idx) in Projects" :key="project_idx">
    <tr>
      <td class="px-4 py-2 border">{{project.name}}</td>
      <td class="px-4 py-2 border">{{project.description}}</td>
      <td class="px-4 py-2 border">{{project.owner}}</td>
      <td class="px-4 py-2 border">
        <span v-for="(auser, auser_idx) in project.users" :key="auser_idx"> ({{auser.username}})</span>
      </td>
    </tr>
  </tbody>
</table>
<h2 class="mb-2 text-2xl font-medium">Chatroom List</h2>
<table class="table-auto">
  <thead>
    <tr>
      <th class="px-4 py-2">ID</th>
      <th class="px-4 py-2">Name</th>
      <th class="px-4 py-2">Description</th>
      <th class="px-4 py-2">Roomtype</th>
      <th class="px-4 py-2">Assigned Users</th>
    </tr>
  </thead>
  <tbody v-for="(room, room_idx) in Chatrooms" :key="room_idx">
    <tr>
      <td class="px-4 py-2 border">{{room.id}}</td>
      <td class="px-4 py-2 border">{{room.name}}</td>
      <td class="px-4 py-2 border">{{room.description}}</td>
      <td class="px-4 py-2 border">{{room.roomtype}}</td>
      <td class="px-4 py-2 border">
        <span v-for="(cuser, cuser_idx) in room.users" :key="cuser_idx"> ({{cuser.username}})</span>
      </td>
    </tr>
  </tbody>
</table>
  </div>
  </div>
  </div>
</template>

<script>
import AdminService from "@/services/admin.service";
export default {
  name: 'Admin',
  components: {
  },
  data(){
    return {
      Users:[],
      Projects:[],
      Chatrooms:[]
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }

    AdminService.getUsers().then(
    response => {
      this.Users = response.data;
    },
    error => {
      this.content =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();
    }
  );
    AdminService.getProjects().then(
    response => {
      this.Projects = response.data;
    },
    error => {
      this.content =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();
    }
  );
    AdminService.getChatrooms().then(
    response => {
      this.Chatrooms = response.data;
    },
    error => {
      this.content =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();
    }
  );
  }
};
</script>
