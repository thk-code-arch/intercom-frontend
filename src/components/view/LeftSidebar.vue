<template>
  <div class="flex w-full flex-col h-full p-4">
    <!-- Menu buttons -->
    <div class="flex flex-row mb-4">
      <div
        v-on:click="currentTab = 'Issues'"
        class="flex justify-center w-full p-4 mr-2 bg-white cursor-pointer"
      >
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          class="w-6 h-6 lightning-bolt"
        >
          <path
            fill-rule="evenodd"
            d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
      <div
        v-on:click="currentTab = 'Materials'"
        class="flex justify-center w-full p-4 mr-1 bg-white cursor-pointer"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6 map">
          <path
            fill-rule="evenodd"
            d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
      <div
        v-on:click="currentTab = 'SavedViews'"
        class="flex justify-center w-full p-4 ml-1 bg-white cursor-pointer"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6 eye">
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
          <path
            fill-rule="evenodd"
            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
      <div
        v-on:click="currentTab = 'Files'"
        class="flex justify-center w-full p-4 ml-2 bg-white cursor-pointer"
      >
        <svg
          class="w-6 h-6"
          data-darkreader-inline-fill=""
          data-darkreader-inline-stroke=""
          fill="none"
          stroke="currentColor"
          style="
            --darkreader-inline-fill: none;
            --darkreader-inline-stroke: currentColor;
          "
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
          ></path>
        </svg>
      </div>
    </div>
    <component v-bind:is="currentTabComponent"></component>
  </div>
</template>

<script>
import Issues from "./Left.Issues";
import Materials from "./Left.Materials";
import SavedViews from "./Left.SavedViews";
import Files from "./Left.Files.vue";

export default {
  name: "left-sidebar",
  components: {
    Issues,
    Materials,
    SavedViews,
    Files,
  },
  data() {
    return {
      currentTab: "Issues",
    };
  },
  computed: {
    currentTabComponent: function () {
      return this.currentTab;
    },
  },
};
</script>
