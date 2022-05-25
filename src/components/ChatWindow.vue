<!-- // Copyright (c) 2021 Steffen Stein <mail@steffenstein.com> For LICENSE see docs/LICENSE -->

<template>
  <!-- Chat content -->
  <div class="flex flex-col w-full overflow-hidden bg-white">
    <!-- Top bar -->
    <router-link to="/chat">
      <div class="flex items-center flex-none px-6 py-2 border-b">
        <div class="flex flex-col">
          <h3 class="mb-1 font-extrabold text-grey-darkest">
            #{{ theroom.name }}
          </h3>
          <p class="text-sm break-words text-grey-dark">
            {{ theroom.description }}
          </p>
        </div>
      </div>
    </router-link>
    <!-- Chat messages -->
    <!-- Chat messages -->
    <div class="flex-1 px-6 py-4 overflow-y-scroll" v-chat-scroll>
      <!-- A message -->
      <div
        class="hist_messages"
        v-for="(hist_msg, hist_index) in messages"
        :key="hist_index"
      >
        <div class="flex items-start mb-4 text-sm" v-if="hist_msg.user">
          <img
            :src="hist_msg.user.profile_image"
            class="w-10 h-10 mr-3 rounded"
          />
          <div class="flex-1 overflow-hidden">
            <div>
              <span class="font-bold">{{ hist_msg.user.username }}</span>
              <span class="text-xs text-gray-700">
                {{ hist_msg.time | formatDate }}</span
              >
            </div>
            <p class="leading-normal text-black">
              <vue-markdown :source="hist_msg.message" />
            </p>
          </div>
        </div>
      </div>
      <!-- A message -->
    </div>
    <!-- New message -->
    <div class="flex-none px-4 pb-6">
      <div class="flex overflow-hidden border-2 rounded-lg border-grey">
        <span class="p-2 text-3xl border-r-2 text-grey border-grey">
          <svg
            class="block w-4 h-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M16 10c0 .553-.048 1-.601 1H11v4.399c0 .552-.447.601-1 .601-.553 0-1-.049-1-.601V11H4.601C4.049 11 4 10.553 4 10c0-.553.049-1 .601-1H9V4.601C9 4.048 9.447 4 10 4c.553 0 1 .048 1 .601V9h4.399c.553 0 .601.447.601 1z"
            />
          </svg>
        </span>
        <form class="w-full" @submit.prevent="clickButton()">
          <input
            v-model="message"
            type="text"
            class="w-full p-1"
            :placeholder="'Message #' + theroom.name"
          />
          <button type="submit" :disabled="message.length == 0"></button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import VueMarkdown from "vue-markdown-render";

export default {
  name: "ChatWindow",
  data() {
    return {
      message: "",
    };
  },
  components: { VueMarkdown },
  computed: {
    messages() {
      return this.$store.getters['chatroom/asc_messages'];
    },
    theroom() {
      return this.$store.state.chatroom.theroom;
    },
  },
  methods: {
    clickButton() {
      // this.$socket.client is `socket.io-client` instance
      this.$store.dispatch("chatroom/CHAT_sendmessage", this.message);
      this.message = "";
    },
  },
  mounted() {
    // Init chatroom socket
    this.$store.dispatch("iosockets/init_chatroom");
    // join chat room
    this.$store.dispatch("chatroom/load_chatlog");
  },
};
</script>
