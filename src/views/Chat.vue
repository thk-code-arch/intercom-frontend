<template>
  <div class="flex flex-row justify-start h-screen2" :style="styleHeight">
    <!-- Channel bar -->
    <div class="flex w-1/5 px-6 py-2 border-b">
      <div class="flex flex-col w-full">
        <h1 class="mb-1 font-extrabold text-grey-darkest">Chatrooms</h1>
        <div class="" v-for="(room, room_index) in chatrooms" :key="room_index">
          <div
            v-on:click="switchRoom(room.id)"
            class="w-full p-2 m-2 bg-white rounded-sm cursor-pointer"
          >
            <h2 class="font-extrabold">#{{ room.name }}</h2>
            <span class="italic">{{ room.description }}</span>
          </div>
        </div>
      </div>
    </div>
    <ChatWindow />
  </div>
</template>

<script>
import ChatWindow from "../components/ChatWindow";
export default {
  name: "Chat",
  components: {
    ChatWindow,
  },
  data() {
    return {
      chatrooms: [],
    };
  },
  computed: {
    theroom() {
      return this.$store.state.chatroom.theroom;
    },
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
    switchRoom(id) {
      this.$store.dispatch("chatroom/select_chatroom", id);
    },
  },
  created() {
    //get actaual chatroomid
    this.$http.get("chat/get_chatrooms").then(
      (response) => {
        // connect to room
        this.chatrooms = response.data;
        if (this.theroom == 0) {
          this.$store.dispatch(
            "chatroom/select_chatroom",
            this.chatrooms[0].id
          );
        }
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
