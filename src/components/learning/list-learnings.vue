<!-- // Copyright (c) 2021 Steffen Stein <mail@steffenstein.com> For LICENSE see docs/LICENSE -->

<template>
  <div class="py-4">
    <div class="py-4">
      <router-link class="float-right" to="/learning/add"
        ><button
          class="inline-block px-3 py-1 mb-2 mr-2 font-semibold text-white bg-gray-800 rounded-full"
        >
          + Add Learning
        </button></router-link
      >
    </div>
    <div>
      <h2 class="text-2xl font-semibold leading-tight">Public</h2>
    </div>
    <div class="grid lg:grid-cols-6 gap-2 sm:grid-cols-2">
      <div
        class=""
        v-for="(theLearning, theLearning_idx) in learnings"
        :key="theLearning_idx"
      >
        <Learning-Card v-bind:theLearning="theLearning" />
      </div>
    </div>
    <div class="py-8">
      <div>
        <h2 class="text-2xl font-semibold leading-tight">Project related</h2>
      </div>
    </div>
  </div>
</template>

<script>
import LearningCard from "./card";
export default {
  name: "list-learnings",
  components: {
    LearningCard,
  },
  methods: {
    getLearnings() {
      this.$http.get("learning/public", {}).then(
        (response) => {
          this.learnings = response.data;
        },
        (error) => {
          this.content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
  mounted() {
    this.getLearnings();
  },
  data() {
    return {
      learnings: {},
    };
  },
};
</script>
