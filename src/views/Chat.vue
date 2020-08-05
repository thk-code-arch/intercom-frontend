<template>

<div class="flex">
    <!-- Top bar -->
    <div class="border-b flex px-6 py-2 items-center flex-none">
        <div class="flex flex-col">
            <h3 class="text-grey-darkest mb-1 font-extrabold">Chatrooms</h3>
            <div class="text-grey-dark text-sm truncate">
                List of Chatrooms.
            </div>
        </div>
    </div>
    <!-- Sidebar / channel list -->
    <div class="my-4 bg-grey-800 flex-none w-64 pb-6 hidden md:block">
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
