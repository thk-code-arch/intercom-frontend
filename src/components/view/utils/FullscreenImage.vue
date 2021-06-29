<!-- // Copyright (c) 2021 Steffen Stein <mail@steffenstein.com> For LICENSE see docs/LICENSE -->

<template>
  <div
    class="fixed top-0 left-0 z-20 flex bg-black items-center justify-center w-full h-full modal"
  >
    <div class="w-full p-12 flex flex-col">
      <img
        class="w-full"
        :src="$files_url + image.filepath"
        :alt="image.description"
      />
      <span class="text-gray-200">
        {{ image.description }} uploaded by {{ image.user.username }} created:
        {{ image.createdAt }}
      </span>
    </div>
    <!--header-->
  </div>
</template>


<script>
export default {
  name: "FullscreenImage",
  props: {
    image: Object,
  },

  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    toggleModal() {},
  },
};
</script>
<style>
.modal {
  transition: opacity 0.25s ease;
}
body.modal-active {
  overflow-x: hidden;
  overflow-y: visible !important;
}
</style>
