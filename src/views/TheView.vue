<!-- // Copyright (c) 2021 Steffen Stein <mail@steffenstein.com> For LICENSE see docs/LICENSE -->

<template>
  <div class="relative h-screen2" :style="styleHeight">
    <div
      class="absolute top-0 z-10 flex flex-row justify-between w-full nopointer h-screen2"
    >
      <div
        class="flex flex-row justify-between bg-gray-200 border-r-2 border-gray-500 h-screen2 bg-opacity-50 allpointer"
        v-bind:class="[leftSidebar]"
      >
        <left-sidebar />
        <div class="flex flex-col justify-between w-6 h-full">
          <div class="flex"></div>
          <div
            class="flex h-32 cursor-pointer bg-codearch-500"
            v-on:click="openSidebar('w-4/5', 'w-1/5')"
          ></div>
          <div class="flex"></div>
        </div>
      </div>

      <div class="h-screen2 nopointer"></div>
      <div
        class="flex flex-row justify-between bg-gray-200 border-l-2 border-gray-500 h-screen2 bg-opacity-50 allpointer"
        v-bind:class="[rightSidebar]"
      >
        <div class="flex flex-col justify-between w-6 h-full">
          <div class="flex"></div>
          <div
            class="flex h-32 cursor-pointer bg-codearch-500"
            v-on:click="openSidebar('w-1/5', 'w-4/5')"
          ></div>
          <div class="flex"></div>
        </div>
        <right-sidebar />
      </div>
    </div>
    <ViewPort v-if="selectedViewport === 'classic'" />
    <IFCPort v-if="selectedViewport === 'ifc'" />
  </div>
</template>

<script>
import LeftSidebar from '@/components/view/LeftSidebar';
import RightSidebar from '@/components/view/RightSidebar';
import ViewPort from '@/components/view/ViewPort';
import IFCPort from '@/components/view/IFCPort';
import projectHeader from '@/services/project-header';

export default {
  name: 'TheView',
  components: {
    IFCPort,
    ViewPort,
    LeftSidebar,
    RightSidebar,
  },
  data() {
    return {
      rightSidebar: 'w-1/5',
      leftSidebar: 'w-1/5',
    };
  },
  computed: {
    viewHeight() {
      const headerHeight = document.getElementById('top').clientHeight;
      return `${headerHeight}px`;
    },
    styleHeight() {
      return {
        '--header-height': this.viewHeight,
      };
    },
    selectedViewport() {
      return this.$store.state.viewport.selectedViewport;
    },
  },
  methods: {
    openSidebar(left, right) {
      if (this.leftSidebar !== this.rightSidebar) {
        this.leftSidebar = 'w-1/5';
        this.rightSidebar = 'w-1/5';
      } else {
        this.leftSidebar = left;
        this.rightSidebar = right;
      }
    },
  },
  created() {
    //get actaual chatroomid
    this.$http.get('chat/get_projectroom/' + projectHeader()).then(
      (response) => {
        // connect to room
        this.$store.dispatch('chatroom/select_chatroom', response.data.id);
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
