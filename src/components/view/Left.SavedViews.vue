<template>
  <div class="flex flex-col flex-1 overflow-hidden bg-white">
    <!-- Top bar -->
    <div class="flex items-center flex-none px-6 py-2 border-b">
      <div class="flex flex-col">
        <h3 class="mb-1 font-extrabold text-grey-darkest">Saved Views</h3>
        <div class="text-sm truncate text-grey-dark">Saved Views</div>
      </div>
    </div>
    <!-- TEXT -->
    <div class="flex items-start mb-4 text-sm">
      <div class="flex-1 px-6">
        <svg
          class="w-10 h-10 rounded cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
            clip-rule="evenodd"
          />
        </svg>
        <p class="leading-normal text-black">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et eagg
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "left-savedviews",
  data() {
    return {
      image: "",
    };
  },
  methods: {},
};
</script>
