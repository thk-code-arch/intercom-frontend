<template>
  <div class="h-screen2" :style="styleHeight">
    <div class="absolute z-10 flex flex-row w-full nopointer">
      <div class="w-full h-screen2">
        <vue-splitter>
          <div
            slot="left-pane"
            class="bg-gray-200 bg-opacity-50 h-screen2 allpointer"
          >
            <left-sidebar />
          </div>
          <div slot="right-pane">
            <div class="w-16 h-screen2 allpointer"></div>
          </div>
        </vue-splitter>
      </div>

      <div class="w-full h-screen2 nopointer"></div>

      <div class="w-full h-screen2">
        <vue-splitter>
          <div slot="left-pane" class="flex justify-end">
            <div class="w-16 h-screen2 allpointer"></div>
          </div>
          <div
            slot="right-pane"
            class="bg-gray-200 bg-opacity-50 h-screen2 allpointer"
          >
            <right-sidebar />
          </div>
        </vue-splitter>
      </div>
    </div>
    <view-port />
  </div>
</template>

<script>
import VueSplitter from "@rmp135/vue-splitter";
import LeftSidebar from "@/components/view/LeftSidebar";
import RightSidebar from "@/components/view/RightSidebar";
import ViewPort from "@/components/view/ViewPort.vue";
import projectHeader from "@/services/project-header";
export default {
  name: "View",
  components: {
    VueSplitter,
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


