<template>
  <div class="relative h-screen2" :style="styleHeight">
    <div
      class="absolute top-0 z-10 flex flex-row justify-between w-full nopointer h-screen2"
    >
      <div
        class="bg-gray-200 border-r-2 border-gray-500 h-screen2 bg-opacity-50 allpointer"
        v-bind:class="[leftSidebar]"
      >
        <left-sidebar />
      </div>

      <div class="h-screen2 nopointer"></div>
      <div
        class="bg-gray-200 border-l-2 border-gray-500 h-screen2 bg-opacity-50 allpointer"
        v-bind:class="[rightSidebar]"
      >
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
      this.leftSidebar = left;
      this.rightSidebar = right;
    },
  },
  created() {
    //get actaual chatroomid
    this.$http.get("chat/get_projectroom/" + projectHeader()).then(
      (response) => {
        // connect to room
        console.log("step1");
        this.$store.dispatch("chatroom/select_chatroom", response.data.id);
        this.$store.dispatch("viewport/select_viewport", response.data.id);
      },
      (error) => {
        console.log(error);
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>


