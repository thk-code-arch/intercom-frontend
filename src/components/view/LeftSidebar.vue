<template>
<div class="p-4 flex flex-col h-auto">
 <!-- Menu buttons -->
  <div class="flex flex-row mb-4 overflow-hidden">
    <div class="flex justify-center bg-white p-4 mr-2 w-full">
      <svg viewBox="0 0 20 20" fill="currentColor" class="lightning-bolt w-6 h-6"><path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"></path></svg>
    </div>
    <div class="flex justify-center bg-white p-4 mr-1 w-full">
      <svg viewBox="0 0 20 20" fill="currentColor" class="map w-6 h-6"><path fill-rule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clip-rule="evenodd"></path></svg>
    </div>
    <div class="flex justify-center bg-white p-4 ml-1 w-full">
      <svg viewBox="0 0 20 20" fill="currentColor" class="eye w-6 h-6"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path></svg>
    </div>
    <div class="flex justify-center bg-white p-4 ml-2 w-full">
      <svg viewBox="0 0 20 20" fill="currentColor" class="book-open w-6 h-6"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"></path></svg>
    </div>
  </div>
  <div class="flex-1 flex flex-col bg-white overflow-hidden">
        <!-- Top bar -->
        <div class="border-b flex px-6 py-2 items-center flex-none">
            <div class="flex flex-col">
                <h3 class="text-grey-darkest mb-1 font-extrabold">Issue creation</h3>
                <div class="text-grey-dark text-sm truncate">
                    Lorem ipsum dolor sit amet,Ch
                </div>
            </div>
        </div>
        <!-- TEXT -->
        <div class="flex items-start mb-4 text-sm">
            <div class="flex-1 px-6">
                <p class="text-black leading-normal">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et eagg</p>
            </div>
        </div>
  </div>
  <div class="my-4 flex-1 flex flex-col bg-white overflow-hidden">
        <!-- Top bar -->
        <div class="border-b flex px-6 py-2 items-center flex-none">
            <div class="flex flex-col">
                <h3 class="text-grey-darkest mb-1 font-extrabold">Issue creation</h3>
                <div class="text-grey-dark text-sm truncate">
                    Lorem ipsum dolor sit amet,Ch
                </div>
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
  name: "left-sidebar",
  data() {
    return {
    };
  }
};
</script>
