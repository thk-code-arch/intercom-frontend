<template>

<div class="font-sans antialiased h-screen flex">
    <!-- Sidebar / channel list -->
    <div class="bg-indigo-darkest text-purple-lighter flex-none p-4 hidden md:block">



    </div>
    <div class="bg-indigo-darker text-purple-lighter flex-none w-64 pb-6 hidden md:block">
    </div>
    <!-- Chat content -->
    <ChatWindow/>
</div>



</template>

<script>

import ChatWindow from "../components/ChatWindow";
export default {
  name: 'Chat',
  components: {
    ChatWindow,
  },
};
</script>
