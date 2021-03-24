<template>
  <div class="h-screen2 relative" :style="styleHeight">
    <div
      class="absolute nopointer top-0 flex flex-row justify-between w-full h-screen2 z-10"
    >
      <div
        class="w-4/12 bg-gray-200 border-r-2 border-gray-500 h-screen2 bg-opacity-50 allpointer"
      >
        <left-sidebar />
      </div>

      <div class="w-full h-screen2 nopointer"></div>
      <div
        class="w-4/12 bg-gray-200 border-l-2 border-gray-500 h-screen2 bg-opacity-50 allpointer"
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


