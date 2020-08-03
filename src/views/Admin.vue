<template>
  <div class="px-4">
    <div class="max-w-6xl bg-white rounded-lg mx-auto my-8 p-8">
        <!-- Top bar -->
        <div class="border-b flex px-6 py-2 mb-4 items-center flex-none">
            <div class="flex flex-col">
                <h1 class="text-2xl font-medium mb-2">Admin Dashboard</h1>
                <div class="text-grey-dark text-sm truncate">
                  Admin section
               </div>
            </div>
        </div>
        <!-- TEXT -->

  <div class="p-8">
<h2 class="text-2xl font-medium mb-2">User List</h2>
<table class="table-auto">
  <thead>
    <tr>
      <th class="px-4 py-2">id</th>
      <th class="px-4 py-2">Username</th>
      <th class="px-4 py-2">Fullname</th>
      <th class="px-4 py-2">Roles</th>
      <th class="px-4 py-2">Assigned Projects</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border px-4 py-2">id</td>
      <td class="border px-4 py-2">Adam</td>
      <td class="border px-4 py-2">Adam Ali</td>
      <td class="border px-4 py-2">User</td>
      <td class="border px-4 py-2">858</td>
    </tr>
  </tbody>
</table>

<h2 class="text-2xl font-medium mb-2">Project List</h2>
<table class="table-auto">
  <thead>
    <tr>
      <th class="px-4 py-2">id</th>
      <th class="px-4 py-2">Name</th>
      <th class="px-4 py-2">Description</th>
      <th class="px-4 py-2">Project Owner</th>
      <th class="px-4 py-2">Assigned Users</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border px-4 py-2">id</td>
      <td class="border px-4 py-2">Projec</td>
      <td class="border px-4 py-2">Adam Ali</td>
      <td class="border px-4 py-2">User</td>
      <td class="border px-4 py-2">858</td>
    </tr>
  </tbody>
</table>
  </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'Admin',
  components: {
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
  },
 data(){
  return {
    file: ''
  }
 },
};
</script>
