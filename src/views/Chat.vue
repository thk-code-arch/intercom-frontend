<template>

<div class="flex h-screen2">
    <!-- Channel bar -->
    <div class="flex flex-none w-1/5 px-6 py-2 border-b">
      <div class="flex flex-col w-full">
            <h1 class="mb-1 font-extrabold text-grey-darkest">Chatrooms</h1>
           <div class="" v-for="(room, room_index) in chatrooms" :key="room_index">
            <div v-on:click="switchRoom(room.id)" class="w-full p-2 m-2 bg-white rounded-sm cursor-pointer">
              <h2 class="font-extrabold">#{{room.name}}</h2>
              <span class="italic">{{room.description}}</span>
            </div>
           </div>
        </div>
    </div>
    <ChatWindow/>
</div>



</template>

<script>

import ChatWindow from "../components/ChatWindow";
import ChatService from "@/services/chat.service";
export default {
  name: 'Chat',
  components: {
    ChatWindow,
  },
  data() {
    return {
      chatrooms:[],
    };
  },
  computed: {
    theroom() {
    return this.$store.state.chatroom.theroom
  }
  },
  methods: {
    switchRoom(id) {
        this.$store.dispatch('chatroom/select_chatroom',id);
    }
  },
  created(){
      //get actaual chatroomid
      ChatService.getChatRooms().then(
      response => {
        // connect to room
        this.chatrooms = response.data.chatrooms;
        console.log("step1");
        if (this.theroom == 0){
          this.$store.dispatch('chatroom/select_chatroom',this.chatrooms[0].id);
        }
      },
      error => {
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
