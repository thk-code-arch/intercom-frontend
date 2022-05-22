<!-- // Copyright (c) 2021 Steffen Stein <mail@steffenstein.com> For LICENSE see docs/LICENSE -->

<template>
  <div class="flex flex-row justify-start h-screen2" :style="styleHeight">
    <!-- Channel bar -->
    <div class="flex w-1/5 px-2 py-2 border-b">
      <div class="flex flex-col w-full overflow-y-scroll">
        <h1 class="mb-1 font-extrabold text-grey-darkest">Chatrooms</h1>
        <div class="" v-for="(room, room_index) in chatrooms" :key="room_index">
          <div
            v-on:click="switchRoom(room.id)"
            class="flex flex-col w-full p-2 mb-2 bg-white rounded cursor-pointer"
            v-bind:class="{
              'border-codearch-500 border-2': room.name === theroom.name,
            }"
          >
            <span class="text-lg font-extrabold">#{{ room.name }}</span>
            <span class="text-xs italic text-left text-gray-600">{{
              room.description
            }}</span>
          </div>
        </div>
      </div>
    </div>
    <ChatWindow />
  </div>
</template>

<script>
import ChatWindow from '../components/ChatWindow';
export default {
  name: 'Chat',
  components: {
    ChatWindow,
  },
  data() {
    return {
      chatrooms: [],
      selectedRoom: 'border-2 border-red-500',
    };
  },
  computed: {
    theroom() {
      return this.$store.state.chatroom.theroom;
    },
    viewHeight() {
      const headerHeight = document.getElementById('top').clientHeight;
      return `${headerHeight}px`;
    },
    styleHeight() {
      return {
        '--header-height': this.viewHeight,
      };
    },
  },
  methods: {
    switchRoom(id) {
      this.$store.dispatch('chatroom/select_chatroom', id);
    },
  },
  created() {
    //get actaual chatroomid
    this.$http.get('chat/get_chatrooms').then(
      (response) => {
        // connect to room
        this.chatrooms = response.data;
        if (this.theroom == 0) {
          this.$store.dispatch(
            'chatroom/select_chatroom',
            this.chatrooms[0].id
          );
        }
      },
      (error) => {
        this.$notify({
          title: 'Ooops...',
          text:
            (error.response && error.response.data) ||
            error.message ||
            error.toString(),
          group: 'error',
        });
      }
    );
  },
};
</script>
