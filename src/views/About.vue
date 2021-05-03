<template>
  <div class="w-full px-4 px-6 sm:px-8">
    <div class="w-3/4 mx-auto">
      <Changelog />
    </div>
  </div>
</template>
<script>
import Changelog from "../components/about/Changelog";

export default {
  name: "home",
  components: {
    Changelog,
  },
  methods: {},
};
</script>
