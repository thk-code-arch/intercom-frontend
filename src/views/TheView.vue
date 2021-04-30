<template>
  <div class="relative h-screen2" :style="styleHeight">
    <div
      class="absolute top-0 z-10 flex flex-row justify-between w-full nopointer h-screen2"
    >
      <div
        class="flex flex-row justify-between bg-gray-200 border-r-2 border-gray-500 h-screen2 bg-opacity-50 allpointer"
        v-bind:class="[leftSidebar]"
      >
        <left-sidebar />
        <div class="flex flex-col justify-between w-6 h-full">
          <div class="flex"></div>
          <div
            class="flex  cursor-pointer justify-center"
            v-on:click="openSidebar('w-4/5', 'w-1/5')"
          >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clip-rule="evenodd" />
</svg>
          
          </div>
          <div class="flex"></div>
        </div>
      </div>

      <div class="h-screen2 nopointer"></div>
      <div
        class="flex flex-row justify-between bg-gray-200 border-l-2 border-gray-500 h-screen2 bg-opacity-50 allpointer"
        v-bind:class="[rightSidebar]"
      >
        <div class="flex flex-col justify-between w-6 h-full">
          <div class="flex"></div>
          <div
            class="flex h-32 cursor-pointer bg-codearch-500"
            v-on:click="openSidebar('w-1/5', 'w-4/5')"
          ></div>
          <div class="flex"></div>
        </div>
        <right-sidebar />
      </div>
    </div>
    <ViewPort />
  </div>
</template>

<script>
import LeftSidebar from "@/components/view/LeftSidebar";
import RightSidebar from "@/components/view/RightSidebar";
import ViewPort from "@/components/view/ViewPort.vue";
import projectHeader from "@/services/project-header";
export default {
  name: "TheView",
  components: {
    ViewPort,
    LeftSidebar,
    RightSidebar,
  },
  data() {
    return {
      rightSidebar: "w-1/5",
      leftSidebar: "w-1/5",
    };
  },
  computed: {
    viewHeight() {
      const headerHeight = document.getElementById("top").clientHeight;
      return `${headerHeight}px`;
    },
    styleHeight() {
      return {
        "--header-height": this.viewHeight,
      };
    },
  },
  methods: {
    openSidebar(left, right) {
      if (this.leftSidebar !== this.rightSidebar) {
        this.leftSidebar = "w-1/5";
        this.rightSidebar = "w-1/5";
      } else {
        this.leftSidebar = left;
        this.rightSidebar = right;
      }
    },
  },
  created() {
    //get actaual chatroomid
    this.$http.get("chat/get_projectroom/" + projectHeader()).then(
      (response) => {
        // connect to room
        this.$store.dispatch("chatroom/select_chatroom", response.data.id);
        this.$store.dispatch("viewport/select_viewport", response.data.id);
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


