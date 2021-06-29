<!-- // Copyright (c) 2021 Steffen Stein <mail@steffenstein.com> For LICENSE see docs/LICENSE -->

<template>
  <div class="flex flex-col flex-1 overflow-hidden bg-white">
        <!-- Top bar -->
        <div class="flex items-center flex-none px-6 py-2 border-b">
            <div class="flex flex-col">
                <h3 class="mb-1 font-extrabold text-grey-darkest">Building Elements</h3>
                <div class="text-sm truncate text-grey-dark">
                  Materials found: {{materials.length}}
                </div>
            </div>
        </div>
        <!-- TEXT -->
        <div class="flex items-start h-full mb-4 overflow-y-scroll text-sm">
            <div class="flex-1 px-6">
              <p class="leading-normal text-black">

<ul>
  <li v-for="(material, index) in materials" :key="`material-${index}`">
    {{material.name}}
  </li>
</ul>
              </p>
            </div>
        </div>
  </div>
</template>

<script>
export default {
  name: "left-materials",
  data() {
    return {};
  },
  computed: {
    materials() {
      return this.$store.state.viewport.materials;
    },
  },
};
</script>
