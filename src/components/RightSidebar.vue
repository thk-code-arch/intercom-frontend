<template>
<div class="px-4">
    <ChatWindow :chatroomid="projectchatroom"/>
  <!-- Online Users -->
  <div class="my-4 flex-1 flex flex-col bg-white overflow-hidden">
        <!-- Top bar -->
        <div class="border-b flex px-6 py-2 items-center flex-none">
            <div class="flex flex-col">
                <h3 class="text-grey-darkest mb-1 font-extrabold">Online Users</h3>
            </div>
        </div>
        <!-- TEXT -->
        <div class="flex items-start mb-4 text-sm">
            <div class="flex-1 px-6">
                <p class="text-black leading-normal">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et eagg</p>
            </div>
        </div>
  </div>
</div>
</template>

<script>

import ChatService from "../services/chat.service";
import ChatWindow from "../components/ChatWindow";

export default {
  name: "right-sidebar",
  components: {
    ChatWindow,
  },
  data: function() {
    return {
      projectchatroom: [],

    }
  },
  created(){
      ChatService.getProjectChatroom().then(
      response => {
        this.projectchatroom = response.data.id;
      },
      error => {
        console.log(error);
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  }
};
</script>
