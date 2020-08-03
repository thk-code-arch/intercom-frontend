<template>
<div class="px-4 h-24">
    <!-- Chat content -->
    <div class="my-4 flex-1 flex flex-col bg-white overflow-hidden">
        <!-- Top bar -->
        <div class="border-b flex px-6 py-2 items-center flex-none">
            <div class="flex flex-col">
                <h3 class="text-grey-darkest mb-1 font-extrabold">#general</h3>
                <div class="text-grey-dark text-sm truncate">
                    Chit-chattin' about ugly HTML and mixing of concerns.
                </div>
            </div>
        </div>
        <!-- Chat messages -->
        <div class="px-6 py-4 flex-1 overflow-y-scroll">
            <!-- A message -->
            <div class="messages" v-for="(msg, index) in messages" :key="index">
            <div class="flex items-start mb-4 text-sm">
                <img src="https://cdn.icon-icons.com/icons2/1509/PNG/512/twitterprofile_104337.png" class="w-10 h-10 rounded mr-3">
                <div class="flex-1 overflow-hidden">
                    <div>
                        <span class="font-bold">{{ msg.user }}</span>
                        <span class="text-grey text-xs">13:37</span>
                    </div>
                    <p class="text-black leading-normal">{{ msg.message }}</p>
                </div>
            </div>
            </div>
            <!-- A message -->
        </div>
        <!-- New message -->
        <div class="pb-6 px-4 flex-none">
            <div class="flex rounded-lg border-2 border-grey overflow-hidden">
                <span class="text-3xl text-grey border-r-2 border-grey p-2">
                    <svg class="fill-current h-6 w-6 block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M16 10c0 .553-.048 1-.601 1H11v4.399c0 .552-.447.601-1 .601-.553 0-1-.049-1-.601V11H4.601C4.049 11 4 10.553 4 10c0-.553.049-1 .601-1H9V4.601C9 4.048 9.447 4 10 4c.553 0 1 .048 1 .601V9h4.399c.553 0 .601.447.601 1z"/></svg>
                  </span>
          <form @submit.prevent="clickButton()">
                <input v-model="message" type="text" class="w-full px-4" placeholder="Message #general" />
                  <button type="submit" >Send Msg</button>
          </form>
            </div>
        </div>
    </div>
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
import io from 'socket.io-client';
export default {
  name: "right-sidebar",
    data() {
        return {
            user: 'admin',
            message: '',
            messages: [],
            socket : io('https://io.bim-cloud.org')
        }
    },
    sockets: {
    connect() {
      console.log('socket connected')
    },
    SEND_MESSAGE() {
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    }
  },
  methods: {
    clickButton() {
      // this.$socket.client is `socket.io-client` instance
      this.$socket.client.emit('SEND_MESSAGE',  {
                message: this.message
            });
      this.message = '';
    }
  },
  mounted() {
      this.socket.on('MESSAGE', (data) => {
        this.messages = [...this.messages, data];
      });
  }
};
</script>
