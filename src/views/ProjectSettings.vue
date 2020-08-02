<template>
  <div class="px-4">
    <div class="max-w-6xl bg-white rounded-lg mx-auto my-8 p-8">
        <!-- Top bar -->
        <div class="border-b flex px-6 py-2 mb-4 items-center flex-none">
            <div class="flex flex-col">
                <h1 class="text-2xl font-medium mb-2">Edit</h1>
                <div class="text-grey-dark text-sm truncate">
                  Project Settings
                </div>
            </div>
        </div>
        <!-- TEXT -->
    <edit-project/>
  </div>
  </div>
</template>

<script>
import EditProject from "../components/EditProject";
export default {
  name: 'Project-Settings',
  components: {
    EditProject
  },
 data(){
  return {
    file: ''
  }
 },
};
</script>
