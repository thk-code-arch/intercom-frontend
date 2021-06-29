<!-- // Copyright (c) 2021 Steffen Stein <mail@steffenstein.com> For LICENSE see docs/LICENSE -->

<template>
  <div class="pt-4 my-6">
    <vue-markdown :source="changelog" />
  </div>
</template>

<script>
import VueMarkdown from "vue-markdown-render";
export default {
  name: "Changelog",
  components: { VueMarkdown },
  computed: {},
  mounted() {
    this.$http.get("changelog").then(
      (response) => {
        this.changelog = response.data;
      },
      (error) => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  },
  data() {
    return { changelog: "changelog" };
  },
  methods: {},
};
</script>
