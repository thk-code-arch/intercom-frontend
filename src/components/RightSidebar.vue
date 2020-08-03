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
            <div class="flex items-start mb-4 text-sm">
                <img src="https://twitter.com/steveschoger/profile_image" class="w-10 h-10 rounded mr-3">
                <div class="flex-1 overflow-hidden">
                    <div>
                        <span class="font-bold">Steve Schoger</span>
                        <span class="text-grey text-xs">11:46</span>
                    </div>
                    <p class="text-black leading-normal">The slack from the other side.</p>
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
                <input v-model="message" type="text" class="w-full px-4" placeholder="Message #general" />
                  <button @click="sendMsg()">Send Msg</button>
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

export default {
  name: "right-sidebar",
  data() {
    return {
    message: '',
    };
  },
  sockets: {
    connect: function () {
        console.log('socket connected')
    },
  },
  methods: {
      sendMsg: function () {
          console.log('button clicked');
          console.log(this.message);
          // $socket is socket.io-client instance
          this.$socket.emit('chatMessage', this.message)
      }
  },
  computed: {
  },
  mounted() {
      this.$socket.on('chatMessage',data => {
          console.log('listen fired')
          console.log(data);

      });
  }
};
</script>
